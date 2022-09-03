import getUser from '../composables/getUser.js'
import { firestore } from '../firebase/config.js'
import { doc, arrayUnion, updateDoc } from 'firebase/firestore'

const { user } = getUser()

const useCart = async () => {
  const addToCart = async (beat) => {
    const docRef = doc(firestore, 'users', user.value.uid)
    await updateDoc(docRef, {
      cart: arrayUnion(beat)
    })
  }

  return { addToCart }
}

export default useCart