import { storage } from '../firebase/config.js'
import { ref } from '@vue/runtime-dom'
import { ref as reference, uploadBytes, getDownloadURL } from 'firebase/storage';


const useStorage = () => {
  const audioError = ref(null)
  const imageError = ref(null)
  const audioUrl = ref(null)
  const imageUrl = ref(null)
  const audioFilePath = ref(null)
  const imageFilePath = ref(null)

  const uploadAudio = async (audioFile) => {
    audioFilePath.value = `preview/${audioFile.name}`
    const storageRef = reference(storage, audioFilePath.value)
    try {
      const res = await uploadBytes(storageRef, audioFile)
      audioUrl.value = await getDownloadURL(res.ref)
    } catch(err) {
      console.log(err.message)
      audioError.value = err.message
    }
  }

  const uploadImage = async (imageFile) => {
    imageFilePath.value = `image/${imageFile.name}`
    const storageRef = reference(storage, imageFilePath.value)
    try {
      const res = await uploadBytes(storageRef, imageFile)
      imageUrl.value = await getDownloadURL(res.ref)

    } catch(err) {
      console.log(err.message)
      imageError.value = err.message
    }
  }

  return { audioError, imageError, audioUrl, imageUrl, uploadAudio, uploadImage }
}

export default useStorage