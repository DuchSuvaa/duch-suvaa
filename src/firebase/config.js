import { initializeApp } from 'firebase/app'
import { serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCwpOmIDlZZG_GWEDtIkRrzZgfd_gFfOyg",
  authDomain: "duch-suvaa.firebaseapp.com",
  projectId: "duch-suvaa",
  storageBucket: "duch-suvaa.appspot.com",
  messagingSenderId: "117843319547",
  appId: "1:117843319547:web:4f2fae67944223ca70ae5e"
};

// init firebase

const firebaseApp = initializeApp(firebaseConfig)

const firestore = getFirestore(firebaseApp)
const projectAuth = getAuth(firebaseApp)
const storage = getStorage(firebaseApp)
const timestamp = serverTimestamp()

export { firestore, projectAuth, storage, timestamp }