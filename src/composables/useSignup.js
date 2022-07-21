import { ref } from "vue"
import { projectAuth, firestore } from "../firebase/config.js"
import  { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const error = ref(null)

const signup = async (email, password ) => {
  error.value = null
  try {
    const res = await createUserWithEmailAndPassword(projectAuth, email, password)
    if (!res) {
      throw new Error('Could not complete the signup')
    }
    sendEmailVerification(projectAuth.currentUser)

    const docRef = doc(firestore, 'users', res.user.uid)

    await setDoc(docRef, {
      id: res.user.uid,
      email: email,
      cart: []
    })

    error.value = null
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
  }
}

const useSignup = () => {

  return { error, signup }

}

export default useSignup