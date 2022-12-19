import React from 'react';
import AppLoading from "expo-app-loading"
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
import 'react-native-gesture-handler';
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
        <AppRoutes />
      </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}


