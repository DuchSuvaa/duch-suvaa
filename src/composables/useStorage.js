import { storage } from '@/firebase/config.js'
import { ref } from '@vue/runtime-dom'
import getUser from '@/composables/getUser.js'

const { user } = getUser()

console.log(user)

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadAudio = async (file) => {
    filePath.value = `preview/${user.value.uid}/${file.name}`
    const storageRef = storage.ref(filePath.value)
    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch(err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return { url, filePath, error, uploadAudio }
}

export default useStorage