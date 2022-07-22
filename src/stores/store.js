import { defineStore } from 'pinia'
import { projectAuth } from '../firebase/config.js'

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
    getUser() {
      this.user = projectAuth.currentUser
    },
    updateName(payload) {
      this.billingDetails.name = payload
    },
    updateEmail(payload) {
      this.billingDetails.email = payload
    },
    updateAddress(payload) {
      this.billingDetails.address = payload
    },
    updateCity(payload) {
      this.billingDetails.city = payload
    },
    updateState(payload) {
      this.billingDetails.state = payload
    },
    updateZip(payload) {
      this.billingDetails.zip = payload
    }
  }
})
