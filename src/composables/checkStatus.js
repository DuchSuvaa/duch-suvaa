import { firestore } from '../firebase/config.js'
import { doc, getDoc } from 'firebase/firestore'

const checkStatus = (items) => {

  let promises = items.map( item => {
    const docRef = doc(firestore, 'beats', item.id)
    return getDoc(docRef)
  })

  return Promise.all(promises)
}

export default checkStatus