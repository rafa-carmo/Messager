import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import NextNProgress from 'nextjs-progressbar'

import { auth, db } from '../firebase'
import Login from './login'
import Loading from '../src/components/Loading'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

function MyApp({ Component, pageProps }: AppProps) {

  const [user, loading] = useAuthState(auth)

  
  useEffect(()=>{

    if(user) {
        setDoc(doc(db, 'users', user.uid), {     
          email: user?.email,
          lastSeen: serverTimestamp(),
          photoUrl: user?.photoURL
        }, {
          merge: true
        })

    }
  },[user])
  
  if(loading) return <Loading />
  if(!user) return <Login />

  
  return (
    <>
    <NextNProgress
    color={'#57886C'}
    startPosition={0.3}
    stopDelayMs={200}
    height={3}
    />
  <Component {...pageProps} />
    </>
  )
}

export default MyApp
