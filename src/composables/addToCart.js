import firebase from 'firebase/app'
import getUser from '@/composables/getUser.js'
import { firestore } from '@/firebase/config.js'

const { user } = getUser()

const useCart = () => {

  const addToCart = (beat) => {
    firestore.collection("users").doc(user.value.uid).update({
      cart: firebase.firestore.FieldValue.arrayUnion(beat)
    })
  }

  return { addToCart }
}

export default useCart