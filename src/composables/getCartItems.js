import { ref, watchEffect } from 'vue'
import { firestore } from '@/firebase/config.js'
import getUser from '@/composables/getUser.js'

const { user } = getUser()

const getCartItems = () => {
  const cartItems = ref(null)
  const error = ref(null)

  let docRef = firestore.collection('users').doc(user.value.uid)

  const unsub = docRef.onSnapshot( (snap) => {
    cartItems.value = snap.data().cart
    console.log(snap.data().cart.length)
  }, (err) => {
    console.log(err.message)
    cartItems.value = null
    error.value = 'Could not fetch data'     
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsub()
    })
  })

  return { cartItems, error }
}

export default getCartItems