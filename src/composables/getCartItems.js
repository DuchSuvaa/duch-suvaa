import { ref, watchEffect } from 'vue'
import { firestore } from '@/firebase/config.js'
import getUser from '@/composables/getUser.js'
import { doc, onSnapshot } from 'firebase/firestore'

const { user } = getUser()

const getCartItems = () => {
  const cartItems = ref(null)
  const cartQuantity = ref(null)
  const error = ref(null)
  const docRef = doc(firestore, 'users', user.value.uid)

  const unsub = onSnapshot(docRef, (snap) => {
    cartItems.value = snap.data().cart
    cartQuantity.value = snap.data().cart.length
  }, (err) => {
    console.log(err.message)
    cartItems.value = null
    cartQuantity.value = null
    error.value = 'Could not fetch data'     
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsub()
    })
  })

  return { cartItems, cartQuantity, error }
}

export default getCartItems