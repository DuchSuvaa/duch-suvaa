import { ref, watchEffect } from 'vue'
import { firestore } from '../firebase/config.js'
import getUser from '../composables/getUser.js'
import { doc, onSnapshot } from 'firebase/firestore'

const { user } = getUser()

const getMyBeats = () => {
  const myBeats = ref([])
  const error = ref(null)
  const docRef = doc(firestore, 'users', user.value.uid)

  const unsub = onSnapshot(docRef, (snap) => {
    myBeats.value = snap.data().purchased_items
  }, (err) => {
    console.log(err.message)
    myBeats.value = []
    error.value = 'Could not fetch data'     
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsub()
    })
  })

  return { myBeats, error }
}

export default getMyBeats