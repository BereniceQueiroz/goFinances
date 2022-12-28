import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
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
  const {signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch(error) {
      console.error(error);
      Alert.alert('Não foi possível conectar a sua conta Google');
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
          Faça seu login  {'\n'}
          com uma das contas abaixo
        </SignInTitle>
      </Header>
      <Content>
        <WrapperButtons>
          <SignInSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </WrapperButtons>
      </Content>
    </Container>
  )
}
