import React from 'react';
import AppLoading from "expo-app-loading"
import { ThemeProvider } from 'styled-components';
import { Dashboard } from '~/screens/Dashboard';
import { Register } from '~/screens/Register';
import { CategorySelect } from '~/screens/CategorySelect';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins';

import theme from "~/global/styles/theme";

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
      {/* <Dashboard /> */}
      <Register />
    </ThemeProvider>
  )
}


