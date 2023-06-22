import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { Input } from '.';
import theme from '~/global/styles/theme';

//funcional para utilizar o theme
const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

describe('Input Component', () => {
  it('must have specific border color when active', () => {
    const { getByTestId  } = render(
        <Input
          testID='input-email'
          placeholder="E-mail"
          keyboardType="email-address"
          autoCorrect={false}
          active={true}
        />,
        {
          wrapper: Providers
        }
    );

    const inputComponent = getByTestId('input-email');

    expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.attention);
  })
})
