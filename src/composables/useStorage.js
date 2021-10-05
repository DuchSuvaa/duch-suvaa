import { storage } from '@/firebase/config.js'
import { ref } from '@vue/runtime-dom'

const useStorage = () => {
  const audioError = ref(null)
  const imageError = ref(null)
  const audioUrl = ref(null)
  const imageUrl = ref(null)
  const audioFilePath = ref(null)
  const imageFilePath = ref(null)

  const uploadAudio = async (audioFile) => {
    audioFilePath.value = `preview/${audioFile.name}`
    const storageRef = storage.ref(audioFilePath.value)
    try {
      const res = await storageRef.put(audioFile)
      audioUrl.value = await res.ref.getDownloadURL()
    } catch(err) {
      console.log(err.message)
      audioError.value = err.message
    }
  }

  const uploadImage = async (imageFile) => {
    imageFilePath.value = `image/${imageFile.name}`
    const storageRef = storage.ref(imageFilePath.value)
    try {
      const res = await storageRef.put(imageFile)
      imageUrl.value = await res.ref.getDownloadURL()
    } catch(err) {
      console.log(err.message)
      imageError.value = err.message
    }
  }

  return { audioError, imageError, audioUrl, imageUrl, audioFilePath, imageFilePath, uploadAudio, uploadImage }
}

export default useStorage