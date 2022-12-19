import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from 'styled-components';
import { Dashboard } from '~/screens/Dashboard';
import { Register } from '~/screens/Register';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false, //oculta o cabeçalho com nome da página
        tabBarActiveTintColor: theme.colors.secondary, // cor do menu quando ativo
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',  //icone ao lado da label
        tabBarStyle: {
          height: 88,
          padding: Platform.OS === 'ios' ? 20 : 0
        }, // estilo da tab
      }}
    >
      <Screen
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name="format-list-bulleted"
              size={size} // size e cor ja definidos no navigation, pego por desestruturaçao
              color={color}

            />
          )
        }}
      />
      <Screen
        name='Cadastrar'
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name="attach-money"
              size={size} // size e cor ja definidos no navigation, pego por desestruturaçao
              color={color}
            />
          )
        }}
      />
      <Screen
        name='Resumo'
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name="pie-chart"
              size={size} // size e cor ja definidos no navigation, pego por desestruturaçao
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}
