import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGySHr1l9yTxQiRoet_vlSTxumyXc2NRM",
  authDomain: "starwars19921996.firebaseapp.com",
  projectId: "starwars19921996",
  storageBucket: "starwars19921996.firebasestorage.app",
  messagingSenderId: "915425782572",
  appId: "1:915425782572:web:e8fb4193e9d4484055da89"
};

export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore( FirebaseApp)

