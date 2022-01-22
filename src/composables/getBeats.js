import { ref, watchEffect } from 'vue'
import { firestore } from '@/firebase/config'

const getCollection = () => {
  const beats = ref(null)
  const error = ref(null)

  let collectionRef = firestore.collection('beats').where('status', '==', 'available').orderBy('createdAt')
  
  const unsub = collectionRef.onSnapshot( (snap) => {
    let results = []
    snap.docs.forEach( doc => {
      // the code on the right only exectutes if code on the left is true
      // it's so that we don't use a local version of snapshot which is
      // created in order for it to work fast
      // timestamp is created only on the server
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
    })
    beats.value = results
    error.value = null
  }, (err) => {
    console.log(err.message)
    beats.value = null
    error.value = 'Could not fetch data'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      unsub()
    })
  })
  return { beats, error }
}

export default getCollection