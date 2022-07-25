import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { projectAuth, firestore } from '../firebase/config.js'
import { doc, setDoc } from 'firebase/firestore'

export const useStore = defineStore('main', {
  id: 'pinia_store',
  state: () => ({
    user: null,
    previewUrl: null,
    logged: false,
    currentBeat: null,
    buttonPressed: '',
    showCheckout: false,
    showQuantity: false,
    showAddToCartPopup: false,
    showPrompt: false,
    billingDetails: {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
  }),
  actions: {
    async signup(email, password) {
      try {
        const res = await createUserWithEmailAndPassword(projectAuth, email, password)
        if (res) {
          sendEmailVerification(this.user)
          const docRef = doc(firestore, 'users', res.user.uid)
          await setDoc(docRef, {
            id: res.user.uid,
            email: email,
            cart: []
          })
          return res
        } else {
          throw new Error('Could not complete the signup')
        }
      }
      catch(err) {
        console.log(err.message)
      }
    },
    async login(email, password) {
      const res = await signInWithEmailAndPassword(projectAuth, email, password)
      if (res) {
        this.user = res.user
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout() {
      try {
        signOut(projectAuth)
        this.user = null
        return true
      } catch(err) {
        return false
      }
    },
    getUser() {
      this.user = projectAuth.currentUser
    }
  }
})
