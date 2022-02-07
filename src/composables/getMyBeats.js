import { ref, watchEffect } from 'vue'
import { firestore } from '@/firebase/config.js'
import getUser from '@/composables/getUser.js'

const { user } = getUser()

const getMyBeats = () => {
  const myBeats = ref([])
  const error = ref(null)
  const docRef = firestore.collection('users').doc(user.value.uid)

  const unsub = docRef.onSnapshot( (snap) => {
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