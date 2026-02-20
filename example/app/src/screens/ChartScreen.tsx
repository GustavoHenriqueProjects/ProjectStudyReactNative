import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type Props = StackScreenProps<RootStackParamList, 'Chart'>;

const CHART_HEIGHT = 240;
const PADDING = 20;

export default function ChartScreen(_props: Props) {
  const { width } = useWindowDimensions();
  const chartWidth = Math.max(width - PADDING * 2, 280);

  const data = Array.from({ length: 50 }, (_, i) => Math.sin(i / 5));
  const labels = data.map((_, i) => (i % 10 === 0 ? String(i) : ''));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Gráfico</Text>
        <Text style={styles.subtitle}>Visualização dos dados</Text>
      </View>

      <View style={styles.card}>
        <LineChart
          data={{
            labels,
            datasets: [{ data }],
          }}
          width={chartWidth}
          height={CHART_HEIGHT}
          chartConfig={{
            backgroundGradientFrom: '#eff6ff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
            labelColor: () => '#64748b',
            strokeWidth: 2,
            propsForDots: {
              r: '3',
              strokeWidth: '1',
              stroke: '#2563eb',
            },
          }}
          withInnerLines
          withOuterLines
          withVerticalLabels
          withHorizontalLabels
          fromZero
          style={styles.chart}
          bezier
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: PADDING,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 4,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  chart: {
    borderRadius: 12,
  },
});
