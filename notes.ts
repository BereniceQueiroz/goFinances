// import React from 'react';
// import { render } from  '@testing-library/react-native';
// import { Profile } from '~/screens/Profile';

// //toBeTruthy => se o valor existe
// //toBeFalsy => se o valor nao existe
// //render = render do component
// //debug = console.log()
// //expect = o que se espera (funcao)
// //testID = utilizado para tests input
// //getByTestId = busca pelo id test
// //toEqual = que seja igual
// // toContain = se contem determinado valor
// //props.children = filho do elemento
// //describe => Suite de test = agrupa por assunto ou por interface/page = describe
// //para testar context, como por exemplo acessar o tema global, necessário instalar jest styled components, para utilizar
// //recursos do styled
// //yarn add --dev jest-styled-componets, fazer configuraçao, fazer a importaçao do pacote no arquivo
// //jest.config
// //para testes de hooks, utilzar lib react-hooks-testing-library
// //yarn add --dev @testing-library/react-hooks
// //no debug o style do component retornar um vetor com varios objetos.
//mockar dados quando dependem de fatores externos, ex login Google
//waitFor assincrono, funcao que faz aguardar acontecer o teste // Promisse
//para funcoes, espere por


/*
//yarn test --watchAll fica escutando os testes
Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.


 coverage report = relatorio testes, para analisar as linhas que nao foram testadas e as que foram.
  yarn test --coverage

  abrir o arquivo index.html
  mostra todos os testes

// describe('Profile Screen', () => {
//   it('should be placeholder correctly input name', () => {
//     const { getByPlaceholderText } = render(<Profile />);

//     const inputName = getByPlaceholderText('Nome');

//     // console.log(inputName.props)
//     expect(inputName).toBeTruthy();
//   });

//   it('should be loaded user data', () => {
//     const { getByTestId } = render(<Profile />);

//     const inputName = getByTestId('input-name');
//     const inputSurname = getByTestId('input-surname');

//     expect(inputName.props.value).toEqual('Berenice');
//     expect(inputSurname.props.value).toEqual('Alves')
//   });

//   it('should exist title correctly', () => {
//     const { getByTestId } = render(<Profile />);
//     const textTitle  = getByTestId('text-title');

//     expect(textTitle.props.children).toContain('Perfil')
//   });
// })



/*
import { renderHook, act } from '@testing-library/react-hooks'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { AuthProvider, useAuth  } from './auth';

//simulaçao da execuçao de terceiros
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
jest.mock('expo-auth-session')

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: {
          id: 'any_id',
          email: 'baqueiroz14@gmail.com',
          name: 'Berenice',
        }
      }
    }
  }
})

/*
  1 - Abre uma tela para i usuario autenticar
  2 - Retorna type e params
  3 - Fetch dos dados de perfil no servidor Google
*/

/*
describe('Auth Hook', () => {
  it('should be abble to sign in with Google existing', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json:() => Promise.resolve({
        id: 'userInfo.id',
        email: 'baqueiroz14@gmail.com',
        name: 'Berenice',
        photo: 'userInfo.picture',
        locale: 'userInfo.locale',
        verified_email: 'userInfo.verified_email',
      })
    })) as jest.Mock;

    const { result} = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
    expect(result.current.user).toBe('baqueiroz14@gmail.com');
  })

  it('user should not connect if cancel authentication with Google', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json:() => Promise.resolve({
        id: 'userInfo.id',
        email: 'baqueiroz14@gmail.com',
        name: 'Berenice',
        photo: 'userInfo.picture',
        locale: 'userInfo.locale',
        verified_email: 'userInfo.verified_email',
      })
    })) as jest.Mock;
    const { result} = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect( result.current.user).not.toHaveProperty('id');
  })
})

teste end-to-end e2e
mais uma estrategia, nao subistitui o teste unitario
simula ambiente real

Detox lib para testes unitarios

*/



