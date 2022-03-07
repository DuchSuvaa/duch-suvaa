import firebase from 'firebase/app'
import getUser from '@/composables/getUser.js'
import { firestore } from '@/firebase/config.js'
import { ref } from 'vue'

const { user } = getUser()

const useCart = () => {
  const userRef = firestore.collection("users").doc(user.value.uid)

  const addToCart = async (product) => {
    // const beatRef = firestore.collection("beats").doc(beat.id)
    const error = ref(null)

    await userRef.get()
    .then((doc) => {
      let foundItem = null
      doc.data().cart.forEach((item) => {
        if (item.id === product.id) {
          foundItem = item.id
        }
      })
      return foundItem
    })
    .then((foundItem) => {
      if (foundItem) {
        error.value = "Item already in cart."
      } else {
        if (product.licence === 'shared') {
          product.price = product.price/2
        }
        userRef.update({
          cart: firebase.firestore.FieldValue.arrayUnion(product)
        })
      }
    })
    return { error }
  }

  return { addToCart }
}

export default useCart