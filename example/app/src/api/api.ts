/**
 * Fluxo do token (complemento):
 * Passo 7: AuthContext chama setAuthToken(accessToken) após o login.
 * Passo 10 e 15: este interceptor de request adiciona o header em TODA requisição.
 * Passo 14–16: requisições (ex.: GET /products) usam o mesmo cliente → token vai no header.
 */
import axios from 'axios';

let authToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

/** Passo 7: chamado pelo AuthContext para guardar o token usado nas próximas requisições. */
export function setAuthToken(token: string | null) {
  authToken = token;
}

export function setOnUnauthorized(callback: (() => void) | null) {
  onUnauthorized = callback;
}

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// Passo 10 / 15: antes de enviar qualquer requisição, adiciona Authorization: Bearer <token>
api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
