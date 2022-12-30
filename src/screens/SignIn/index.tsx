import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from "styled-components";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Content,
  WrapperButtons
} from './styles';
import LogoSvg from "~/assets/logo.svg";
import AppleSvg from "~/assets/apple.svg";
import GoogleSvg from "~/assets/google.svg";
import {SignInSocialButton } from '~/components/SignInSocialButton';
import { useAuth } from '~/hooks/auth';


export function SignIn() {
  const [ isLoading, setIsLoading ] = useState(false);
  const {signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch(error) {
      console.error(error);
      Alert.alert('Não foi possível conectar a sua conta Google');
      setIsLoading(false);
    }
  }
  async function handleSignInWitApple() {
    try {
      setIsLoading(true);
      return await signInWithApple(); //o return serve para parar a busca com o retorno
    } catch(error) {
      console.error(error);
      Alert.alert('Não foi possível conectar a sua conta Apple');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login
        </SignInTitle>
      </Header>
      <Content>
        <WrapperButtons>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />
          {
            Platform.OS === 'ios' &&
            <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={handleSignInWitApple} />
          }
        </WrapperButtons>
        { isLoading &&
          <ActivityIndicator
            color={theme.colors.shape}
            size='small'
            style={{ marginTop: 18}}
          /> }
      </Content>
    </Container>
  )
}
