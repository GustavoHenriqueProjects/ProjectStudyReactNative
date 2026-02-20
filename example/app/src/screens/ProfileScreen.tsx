import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/types';
import type { MeResponse, MeResponseAddress, MeResponseCompany } from '../types';

type Props = StackScreenProps<RootStackParamList, 'Profile'>;

function formatDateBR(isoDate: string | undefined): string | undefined {
  if (!isoDate || !isoDate.trim()) return undefined;
  const parts = isoDate.split('T')[0].split('-'); // YYYY-MM-DD ou YYYY-M-D
  if (parts.length < 3) return isoDate;
  const day = parts[2].padStart(2, '0');
  const month = parts[1].padStart(2, '0');
  return `${day}/${month}/${parts[0]}`; // DD/MM/YYYY
}

function formatAddress(addr: MeResponseAddress | undefined): string | undefined {
  if (!addr) return undefined;
  const parts = [
    addr.address,
    addr.city,
    addr.state ? (addr.stateCode ? `${addr.state} (${addr.stateCode})` : addr.state) : undefined,
    addr.postalCode,
    addr.country,
  ].filter(Boolean);
  return parts.length ? parts.join(', ') : undefined;
}

function formatCompany(company: MeResponseCompany | undefined): string | undefined {
  if (!company) return undefined;
  const parts = [company.name, company.title].filter(Boolean);
  return parts.length ? parts.join(' • ') : undefined;
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  if (value === undefined || value === null || String(value).trim() === '')
    return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen({ navigation }: Props) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Nenhum usuário logado.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        {user.image ? (
          <Image source={{ uri: user.image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarLetter}>
              {user.firstName?.charAt(0) || '?'}
            </Text>
          </View>
        )}
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        {user.username ? (
          <Text style={styles.username}>@{user.username}</Text>
        ) : null}
      </View>

      <View style={styles.body}>
        <Row label="Idade" value={user.age} />
        <Row label="E-mail" value={user.email} />
        <Row label="Telefone" value={user.phone} />
        <Row label="Gênero" value={user.gender} />
        <Row label="Nascimento" value={formatDateBR(user.birthDate)} />
        <Row label="Função" value={user.role} />
        <Row label="Nome de solteira" value={user.maidenName} />
        <Row label="Tipo sanguíneo" value={user.bloodGroup} />
        <Row label="Cor dos olhos" value={user.eyeColor} />
        {user.height != null ? (
          <Row label="Altura (cm)" value={Math.round(user.height)} />
        ) : null}
        {user.weight != null ? (
          <Row label="Peso (kg)" value={user.weight} />
        ) : null}
        <Row label="Universidade" value={user.university} />
        <Row label="Endereço" value={formatAddress(user.address)} />
        <Row label="Empresa" value={formatCompany(user.company)} />
        {user.hair ? (
          <Row
            label="Cabelo"
            value={[user.hair.color, user.hair.type].filter(Boolean).join(' • ') || undefined}
          />
        ) : null}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
    paddingTop: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarLetter: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },
  username: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  body: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  row: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
  },
});
