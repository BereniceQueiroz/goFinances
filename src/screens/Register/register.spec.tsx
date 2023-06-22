import React from "react";
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { NavigationContainer } from '@react-navigation/native';
import { Register } from '.';

import { ThemeProvider } from 'styled-components/native';
import theme from '~/global/styles/theme';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

//funcional para utilizar o theme
const Providers: React.FC = ({ children }: any) => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </NavigationContainer>
  )
}

describe('Register Screen', () => {
  it('should be open category modal when user click on the category button',  async () => {
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    );
    const categoryModal = getByTestId('modal-category');
    const categoryButton =  getByTestId('category-button');

    expect(categoryModal.props.visible).toBeFalsy();
    fireEvent.press(categoryButton)
    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
