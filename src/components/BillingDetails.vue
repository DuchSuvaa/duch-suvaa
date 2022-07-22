<template>
  <form @submit.prevent="" id="checkout-form">
    <div class="checkout-name input-field">
      <label for="name" :class="{ active: store.billingDetails.name }">Name</label>
      <input type="text" id="name" :value="name" @input="updateName">
    </div>
    <div class="checkout-email input-field">
      <label for="email" :class="{ active: store.billingDetails.email }">E-mail</label>
      <input type="text" id="email" :value="email" @input="updateEmail">
    </div>
    <div class="checkout-address input-field">
      <label for="address" :class="{ active: store.billingDetails.address }">Address</label>
      <input type="text" id="address" :value="address" @input="updateAddress">
    </div>
    <div class="checkout-city input-field">
      <label for="city" :class="{ active: store.billingDetails.city }">City</label>
      <input type="text" id="city" :value="city" @input="updateCity">
    </div>
    <div class="checkout-state input-field">
      <label for="state" :class="{ active: store.billingDetails.state }">State</label>
      <input type="text" id="state" :value="state" @input="updateState">
    </div>
    <div class="checkout-zip input-field">
      <label for="zip" :class="{ active: store.billingDetails.zip }">ZIP code</label>
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

<script setup>
import { useStore } from '../stores/store.js'
import { firestore } from '../firebase/config.js'
import { computed, onMounted, ref } from '@vue/runtime-core'
import { doc, getDoc, updateDoc } from "firebase/firestore"

const store = useStore()
const message = ref('')
const error = ref('')
const name = computed( () => { return store.billingDetails.name })
const email = computed( () => { return store.billingDetails.email })
const address = computed( () => { return store.billingDetails.address })
const city = computed( () => { return store.billingDetails.city })
const state = computed( () => { return store.billingDetails.state })
const zip = computed( () => { return store.billingDetails.zip })

const updateName = (event) => { store.updateName(event.target.value) }
const updateEmail = (event) => { store.updateEmail(event.target.value) }
const updateAddress = (event) => { store.updateAddress(event.target.value) }
const updateCity = (event) => { store.updateCity(event.target.value) }
const updateState = (event) => { store.updateState(event.target.value) }
const updateZip = (event) => { store.updateZip(event.target.value) }

onMounted( async () => {
  const docRef = doc(firestore, 'users', store.user.uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.data().address) {
    store.billingDetails.name = docSnap.data().address.name
    store.billingDetails.email = docSnap.data().address.email
    store.billingDetails.address = docSnap.data().address.address
    store.billingDetails.city = docSnap.data().address.city
    store.billingDetails.state = docSnap.data().address.state
    store.billingDetails.zip = docSnap.data().address.zip
  }
})

const saveAddress = async () => {
  const addressFields = {
    name: store.billingDetails.name,
    email: store.billingDetails.email,
    address: store.billingDetails.address,
    city: store.billingDetails.city,
    state: store.billingDetails.state,
    zip: store.billingDetails.zip
  }

  try {
    const docRef = doc(firestore, 'users', store.user.uid)
    await updateDoc(docRef, {
      address: addressFields
    })
    message.value = 'Address saved.'
    setTimeout( () => {
        message.value = ''
    }, 10000)
  } catch(err) {
    console.log(err.message)
    error.value = err  
  }
}

</script>

<style lang="scss" scoped>

  #checkout-form {
    label {
      position: relative;
      top: 2.9rem !important;
    }
    .input-field:nth-child(3), .input-field:nth-child(4), .input-field:nth-child(5), .input-field:nth-child(6) {
      margin-top: -50px;
    }
  }
</style>