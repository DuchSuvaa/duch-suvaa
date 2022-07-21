import firebase from 'firebase/app'
import getUser from '@/composables/getUser.js'
import { firestore } from '@/firebase/config.js'
import { doc, arrayUnion } from 'firebase/firestore'

const { user } = getUser()

const useCart = async () => {
  const addToCart = (beat) => {
    const docRef = doc(firestore, 'users', user.value.uid)
    await updateDoc(docRef, {
      cart: arrayUnion(beat)
    })
  }

  return { addToCart }
}

export default useCart