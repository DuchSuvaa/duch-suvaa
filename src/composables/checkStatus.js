import { firestore } from '@/firebase/config.js'

const checkStatus = (items) => {

  let promises = items.map( item => {
    const docRef = firestore.collection('beats').doc(item.id)
    return docRef.get()
  })

  return Promise.all(promises)
}

export default checkStatus