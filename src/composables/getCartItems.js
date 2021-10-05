import { ref, watchEffect } from 'vue'
import { firestore } from '@/firebase/config.js'
import getUser from '@/composables/getUser.js'

const { user } = getUser()

const getCartItems = () => {
  const cartItems = ref(null)
  const cartQuantity = ref(null)
  const error = ref(null)

  let docRef = firestore.collection('users').doc(user.value.uid)

  const unsub = docRef.onSnapshot( (snap) => {
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