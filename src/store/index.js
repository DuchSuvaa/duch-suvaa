import { createStore } from 'vuex'
import { ref } from 'vue'
import { projectAuth } from '../firebase/config.js'

export default createStore({
  state: {
    user: null,
    logged: false,
    showCheckout: false,
    showQuantity: false,
  },
  mutations: {
    getUser: state => {
      state.user = ref(projectAuth.currentUser)
    }
  },
  actions: {

  },
  modules: {
  }
})
