import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import { useErrorModal } from '../modals';
import { AxiosError } from 'axios';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState<string>('emilys');
  const [password, setPassword] = useState<string>('emilyspass');
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const { showError } = useErrorModal();

  const handleLogin = async () => {
    try {
      setLoading(true);
      // Passo 1: usuário preenche usuário/senha e clica em "Entrar"
      // Passo 2: chama login(username, password) do AuthContext
      await login(username, password);
      // Passo 13: sucesso → navega para a tela de listagem
      navigation.navigate('List');
    } catch (error) {
      const message =
        error instanceof AxiosError && error.response?.data?.message
          ? String(error.response.data.message)
          : 'Erro ao autenticar. Verifique usuário e senha.';
      showError('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>
          Use suas credenciais para acessar o app
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            placeholder="Digite seu usuário"
            placeholderTextColor="#94a3b8"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          {/* Temporário: botão para testar o modal de erro. Remover depois. */}
          {/* <TouchableOpacity
            style={styles.testModalButton}
            onPress={() => showError('Erro', 'Mensagem de teste do modal de erro.')}
            activeOpacity={0.8}
          >
            <Text style={styles.testModalText}>Testar modal de erro</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 28,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  testModalButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 8,
  },
  testModalText: {
    fontSize: 13,
    color: '#64748b',
    textDecorationLine: 'underline',
  },
});
