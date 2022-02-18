import { ref } from 'vue'
import { firestore } from '../firebase/config.js'

const addBeat = () => {
  const error = ref(null)

  const add = async (beat) => {
    error.value = null
    console.log('tutaj')
    try {
      await firestore.collection('beats').add(beat)
    } catch(err) {
      error.value = 'could not add the beat'
      console.log(err.message)
    }

  }
  return { error, add }
}

export default addBeat