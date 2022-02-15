<template>
  <form @submit.prevent="" id="checkout-form">
    <div class="checkout-name input-field">
      <label for="name" :class="{ active: store.state.billingDetails.name }">Name</label>
      <input type="text" id="name" :value="name" @input="updateName">
    </div>
    <div class="checkout-email input-field">
      <label for="email" :class="{ active: store.state.billingDetails.email }">E-mail</label>
      <input type="text" id="email" :value="email" @input="updateEmail">
    </div>
    <div class="checkout-address input-field">
      <label for="address" :class="{ active: store.state.billingDetails.address }">Address</label>
      <input type="text" id="address" :value="address" @input="updateAddress">
    </div>
    <div class="checkout-city input-field">
      <label for="city" :class="{ active: store.state.billingDetails.city }">City</label>
      <input type="text" id="city" :value="city" @input="updateCity">
    </div>
    <div class="checkout-state input-field">
      <label for="state" :class="{ active: store.state.billingDetails.state }">State</label>
      <input type="text" id="state" :value="state" @input="updateState">
    </div>
    <div class="checkout-zip input-field">
      <label for="zip" :class="{ active: store.state.billingDetails.zip }">ZIP code</label>
      <input type="text" id="zip" :value="zip" @input="updateZip">
    </div>
    <div class="checkout-buttons">
      <div class="waves-effect waves-light btn" @click="saveAddress">Save</div>
      <input class="waves-effect waves-light btn" type="reset" value="reset">
    </div>
  </form>
  <div v-if="error" class="error">
    {{ error }}
  </div>
  <div v-if="message" class="message">
    {{ message }}
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { firestore } from '@/firebase/config.js'
import { computed, onMounted, ref } from '@vue/runtime-core'

export default {
  setup() {
    const store = useStore()
    const message = ref('')
    const error = ref('')
    const name = computed( () => { return store.state.billingDetails.name })
    const email = computed( () => { return store.state.billingDetails.email })
    const address = computed( () => { return store.state.billingDetails.address })
    const city = computed( () => { return store.state.billingDetails.city })
    const state = computed( () => { return store.state.billingDetails.state })
    const zip = computed( () => { return store.state.billingDetails.zip })

    const updateName = (event) => { store.commit('updateName', event.target.value) }
    const updateEmail = (event) => { store.commit('updateEmail', event.target.value) }
    const updateAddress = (event) => { store.commit('updateAddress', event.target.value) }
    const updateCity = (event) => { store.commit('updateCity', event.target.value) }
    const updateState = (event) => { store.commit('updateState', event.target.value) }
    const updateZip = (event) => { store.commit('updateZip', event.target.value) }

    onMounted( async () => {
      const docRef = firestore.collection('users').doc(store.state.user.uid)
      // console.log(store.state.user.uid)

      docRef.onSnapshot( (snap) => {
        if (snap.data().address) {
          store.state.billingDetails.name = snap.data().address.name
          store.state.billingDetails.email = snap.data().address.email
          store.state.billingDetails.address = snap.data().address.address
          store.state.billingDetails.city = snap.data().address.city
          store.state.billingDetails.state = snap.data().address.state
          store.state.billingDetails.zip = snap.data().address.zip
        }
      })
    })

    const saveAddress = () => {
      const addressFields = {
        name: store.state.billingDetails.name,
        email: store.state.billingDetails.email,
        address: store.state.billingDetails.address,
        city: store.state.billingDetails.city,
        state: store.state.billingDetails.state,
        zip: store.state.billingDetails.zip
      }
      firestore.collection('users').doc(store.state.user.uid).update({
        address: addressFields
      }).then( () => {
        message.value = 'Address saved.'
        setTimeout( () => {
          message.value = ''
        }, 10000)
      }).catch( (err) => {
        console.log(err.message)
        error.value = err
        setTimeout( () => {
          error.value = ''
        }, 10000)        
      })
    }

    return { store, name, email, address, city, state, zip, message, error, 
    updateName, updateEmail, updateAddress, updateCity, updateState, updateZip, saveAddress }
  }
}
</script>

<style lang="scss" scoped>
  label {
    position: relative;
    top: 2.9rem !important;
  }
</style>