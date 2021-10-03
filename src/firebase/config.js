import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCwpOmIDlZZG_GWEDtIkRrzZgfd_gFfOyg",
  authDomain: "duch-suvaa.firebaseapp.com",
  projectId: "duch-suvaa",
  storageBucket: "duch-suvaa.appspot.com",
  messagingSenderId: "117843319547",
  appId: "1:117843319547:web:4f2fae67944223ca70ae5e"
};

// init firebase

firebase.initializeApp(firebaseConfig)

// init firestore 

const firestore = firebase.firestore()
const projectAuth = firebase.auth()
const storage = firebase.storage()

export { firestore, projectAuth, storage }