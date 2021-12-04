
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider } from 'firebase/auth'


const apiKey = process.env.NEXT_PUBLIC_Firebase_API_KEY
const authDomain = process.env.NEXT_PUBLIC_Firebase_Auth_Domain
const projectId= process.env.NEXT_PUBLIC_Firebase_Project_ID
const storageBucket= process.env.NEXT_PUBLIC_Firebase_Storage_Bucket
const messagingSenderId= process.env.NEXT_PUBLIC_Firebase_Messaging_Sender_Id
const appId= process.env.NEXT_PUBLIC_Firebase_APP_ID

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};



const app = initializeApp(firebaseConfig);



  const db = getFirestore(app)
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  })

  
  const auth = getAuth(app)

  export { db, auth, provider}