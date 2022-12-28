import React from 'react';
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import AppLoading from "expo-app-loading";
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import  { AppRoutes} from '~/routes/app.routes';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

import theme from "~/global/styles/theme";
import { NavigationContainer } from '@react-navigation/native';

import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  if(!fontsLoaded) {
    return  <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <AppRoutes />
      </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}


