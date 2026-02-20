import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Product } from '../types';

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <View style={styles.card}>
      {product.thumbnail ? (
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.thumb}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.thumbPlaceholder} />
      )}
      <View style={styles.body}>
        {product.category ? (
          <Text style={styles.category}>{product.category}</Text>
        ) : null}
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        {product.description ? (
          <Text style={styles.description} numberOfLines={1}>
            {product.description}
          </Text>
        ) : null}
        <Text style={styles.brand}>{product.brand}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          {product.stock != null ? (
            <Text style={styles.stock}>{product.stock} em estoque</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#93c5fd',
    backgroundColor: '#eff6ff',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  thumb: {
    width: 88,
    height: 88,
    backgroundColor: '#f1f5f9',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  thumbPlaceholder: {
    width: 88,
    height: 88,
    backgroundColor: '#e2e8f0',
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  body: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 11,
    color: '#2563eb',
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  brand: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
  },
  stock: {
    fontSize: 12,
    color: '#64748b',
  },
});
