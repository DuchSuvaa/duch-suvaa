import { ref } from "vue"
import { projectAuth } from '../firebase/config.js'
import { signOut } from 'firebase/auth'

const logoutError = ref(null)

const logout = async () => {
  logoutError.value = null
  
  try {
    await signOut(projectAuth)
  }
  catch(err) {
    console.log(err.message)
    logoutError.value = err.message
  }
}

const useLogout = () => {
 return { logout, logoutError }
}

export default useLogout