import { createContext, ReactNode, useContext } from 'react';
import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData );

function AuthProvider({children}: AuthProviderProps) {
  const user = {
    id: '1',
    name: 'Berenice',
    email: 'email@email.com'
  }

  async function signInWithGoogle() {
    try {
      //credentiais geradas no oAuth2 Google ao criar o projeto
      const CLIENT_ID = '264333865041-pm5k3bb2r58t0vo5g5ng5s6upegf2r1f.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@berenicequeiroz/gofinances';
      const RESPONSE_TYPE = 'token'; //tipo da resposta que esperamos receber
      const SCOPE = encodeURI('profile email'); //combinaçao para a url

      //endpoint de autent Google
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl});

      console.log(response)

    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }
