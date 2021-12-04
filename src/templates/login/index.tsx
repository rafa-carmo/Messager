import { auth, provider } from '../../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import Head from 'next/head';

import * as S from './styles'
import { Button } from '@material-ui/core';

function LoginTemplate() {
    const signIn = () => {
        signInWithPopup(auth, provider).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
        }).catch(alert)
    }
    return (
        <S.Container>
            <Head>
                <title>Login</title>
            </Head>

            <S.LoginContainer>
                <S.Logo src="/logo.svg" />
                <Button onClick={signIn} variant="outlined">Entrar com Google</Button>
            </S.LoginContainer>
        </S.Container>
    )
}

export default LoginTemplate
