/**
 * Fluxo do token (passos 1–16):
 * Passo 1–2: LoginScreen chama login() → ver LoginScreen.
 * Passo 3–8: login() faz POST /auth/login, guarda token (estado, api, SecureStore).
 * Passo 9–12: fetchUser() faz GET /auth/me (token vai no header via interceptor em api.ts).
 * Passo 13: LoginScreen navega para List.
 * Passo 14–16: Todas as requisições com api.get/post recebem o header Authorization → ver api.ts.
 */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api, { setAuthToken, setOnUnauthorized } from '../api/api';
import { LoginResponse, MeResponse } from '../types';

const TOKEN_KEY = 'auth_token';

// No Snack/web o SecureStore usa IndexedDB em contexto read-only e falha.
// Usamos armazenamento em memória na web para evitar o erro.
let webMemoryToken: string | null = null;

async function getStoredToken(): Promise<string | null> {
  if (Platform.OS === 'web') return webMemoryToken;
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

async function setStoredToken(value: string | null): Promise<void> {
  if (Platform.OS === 'web') {
    webMemoryToken = value;
    return;
  }
  if (value === null) {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } else {
    await SecureStore.setItemAsync(TOKEN_KEY, value);
  }
}

interface AuthContextData {
  token: string | null;
  user: MeResponse | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<MeResponse | null>(null);

  const logout = useCallback(async () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    await setStoredToken(null);
  }, []);

  useEffect(() => {
    getStoredToken().then((stored) => {
      if (stored) setToken(stored);
    });
  }, []);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  useEffect(() => {
    setOnUnauthorized(() => {
      logout();
    });
    return () => setOnUnauthorized(null);
  }, [logout]);

  const fetchUser = useCallback(async () => {
    // GET /auth/me — o interceptor em api.ts (Passo 10/15) adiciona Authorization: Bearer <token>
    const response = await api.get<MeResponse>('/auth/me');
    setUser(response.data);
  }, []);

  useEffect(() => {
    if (token && !user) {
      fetchUser().catch(() => {});
    }
  }, [token, user, fetchUser]);

  const login = async (username: string, password: string) => {
    // Passo 3: requisição POST /auth/login com username e password
    const response = await api.post<LoginResponse>('/auth/login', {
      username,
      password,
    });
    // Passo 4: backend responde com accessToken (e refreshToken)
    // Passo 5: extrai o accessToken da resposta
    const accessToken = response.data.accessToken;
    // Passo 6: guarda o token no estado do React (UI sabe que está logado)
    setToken(accessToken);
    // Passo 7: repassa o token para o cliente HTTP (api.ts) para as próximas requisições
    setAuthToken(accessToken);
    // Passo 8: persiste o token no dispositivo (SecureStore) ou em memória na web
    await setStoredToken(accessToken);
    // Passo 9: chama GET /auth/me (o interceptor em api.ts adiciona o header no Passo 10)
    // Passo 11: requisição é enviada com Authorization: Bearer <token>
    // Passo 12: backend devolve dados do usuário → setUser(response.data)
    await fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
