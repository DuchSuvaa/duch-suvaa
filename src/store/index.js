import { createStore } from 'vuex'
import { ref } from 'vue'
import { projectAuth } from '../firebase/config.js'

export default createStore({
  state: {
    user: null,
    logged: false,
    showCheckout: false,
    showQuantity: false,
    billingDetails: {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
  },
  mutations: {
    getUser: state => {
      state.user = ref(projectAuth.currentUser)
    },
    updateName(state, payload) {
      state.billingDetails.name = payload
    },
    updateEmail(state, payload) {
      state.billingDetails.email = payload
    },
    updateAddress(state, payload) {
      state.billingDetails.address = payload
    },
    updateCity(state, payload) {
      state.billingDetails.city = payload
    },
    updateState(state, payload) {
      state.billingDetails.state = payload
    },
    updateZip(state, payload) {
      state.billingDetails.zip = payload
    }
  },
  actions: {

  },
  modules: {
  }
})
