import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import api from '../api/api';
import { Product, ProductsResponse } from '../types';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation/types';
import ProductListItem from '../components/ProductListItem';
import { useErrorModal } from '../modals';

type Props = StackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({ navigation }: Props) {
  const [search, setSearch] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { showError } = useErrorModal();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Passo 14–16: requisição usa o mesmo cliente api → token vai no header automaticamente
      const response = await api.get<ProductsResponse>('/products');
      setProducts(response.data.products);
      setTotalProducts(response.data.total ?? response.data.products.length);
    } catch (err) {
      const msg = 'Não foi possível carregar os produtos.';
      setError(msg);
      showError('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const term = search.trim().toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(term));
  }, [products, search]);

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            {user ? (
              <>
                <Text style={styles.welcome}>
                  Olá, <Text style={styles.welcomeName}>{user.firstName}</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  style={styles.profileIconWrap}
                >
                  <Ionicons name="person-circle" size={36} color="#2563eb" />
                </TouchableOpacity>
              </>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.chartButton}
            onPress={() => navigation.navigate('Chart')}
            activeOpacity={0.8}
          >
            <Text style={styles.chartButtonText}>Ver gráfico</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrap}>
          <TextInput
            placeholder="Buscar produto..."
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
          <Text style={styles.totalText}>
            {search.trim()
              ? `${filteredProducts.length} de ${totalProducts} produtos`
              : `${totalProducts} produtos`}
          </Text>
        </View>
      </View>

      {error ? (
        <View style={styles.errorWrap}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProductListItem product={item} />}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={styles.empty}>
                {search.trim()
                  ? 'Nenhum produto encontrado para essa busca.'
                  : 'Nenhum produto disponível.'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 12,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: '#f8fafc',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  header: {
    paddingBottom: 16,
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  welcome: {
    fontSize: 22,
    color: '#334155',
  },
  profileIconWrap: {
    padding: 4,
  },
  welcomeName: {
    fontWeight: '700',
    color: '#0f172a',
  },
  welcomeAge: {
    fontWeight: '400',
    color: '#64748b',
  },
  chartButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  chartButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  searchWrap: {
    marginBottom: 16,
  },
  totalText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 6,
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
  },
  errorWrap: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  error: {
    marginTop: 8,
    fontSize: 15,
    color: '#dc2626',
  },
  emptyWrap: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  empty: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
});
