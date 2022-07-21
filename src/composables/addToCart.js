// import firebase from 'firebase/app'
import getUser from '@/composables/getUser.js'
import { firestore } from '@/firebase/config.js'
import { ref } from 'vue'
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'

const { user } = getUser()

const useCart = () => {
  const userRef = doc(firestore, 'users', user.value.uid)

  const addToCart = async (product) => {
    const error = ref(null)

    const docSnap = await getDoc(userRef)
    let foundItem = null
    docSnap.data().cart.forEach((item) => {
      if (item.id === product.id) {
        foundItem = item.id
      }
    })

    if (foundItem) {
      error.value = "Item already in cart."
    } else {
      if (product.licence === 'shared') {
        product.price = product.price/2
      }
      await updateDoc(userRef, {
        cart: arrayUnion(product)
      })
    }

    return { error }
  }

  return { addToCart }
}

export default useCart