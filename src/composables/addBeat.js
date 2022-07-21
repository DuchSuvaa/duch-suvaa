import { ref } from 'vue'
import { firestore } from '../firebase/config.js'
import { collection, addDoc } from 'firebase/firestore'

const addBeat = () => {
  const error = ref(null)

  const add = async (beat) => {
    error.value = null
    console.log('tutaj')
    try {
      const collectionRef = collection(firestore, 'beats')
      await addDoc(collectionRef, beat)
    } catch(err) {
      error.value = 'could not add the beat'
      console.log(err.message)
    }

  }
  return { error, add }
}

export default addBeat