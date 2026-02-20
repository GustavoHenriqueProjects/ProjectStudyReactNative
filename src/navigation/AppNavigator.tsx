import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import ListScreen from '../screens/ListScreen';
import ChartScreen from '../screens/ChartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Chart" component={ChartScreen} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Meu perfil' }}
      />
    </Stack.Navigator>
  );
}
