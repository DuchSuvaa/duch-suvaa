<template>
  <form @submit.prevent="" id="checkout-form">
    <div class="checkout-name">
      <input type="text" id="name" :value="store.billingDetails.name" 
      @input="event => store.billingDetails.name = event.target.value" placeholder="">
      <label for="name" :class="{ active: store.billingDetails.name }">Name</label>    
    </div>
    <div class="checkout-email">
      <input type="text" id="email" :value="store.billingDetails.email" 
      @input="event => store.billingDetails.email = event.target.value" placeholder="">
      <label for="email" :class="{ active: store.billingDetails.email }">E-mail</label>    
    </div>
    <div class="checkout-address">
      <input type="text" id="address" :value="store.billingDetails.address" 
      @input="event => store.billingDetails.address = event.target.value" placeholder="">
      <label for="address" :class="{ active: store.billingDetails.address }">Address</label>    
    </div>
    <div class="checkout-city">
      <input type="text" id="city" :value="store.billingDetails.city" 
      @input="event => store.billingDetails.city = event.target.value" placeholder="">
      <label for="city" :class="{ active: store.billingDetails.city }">City</label>    
    </div>
    <div class="checkout-state">
      <input type="text" id="state" :value="store.billingDetails.state" 
      @input="event => store.billingDetails.state = event.target.value" placeholder="">
      <label for="state" :class="{ active: store.billingDetails.state }">State</label>    
    </div>
    <div class="checkout-zip">
      <input type="text" id="zip" :value="store.billingDetails.zip" 
      @input="event => store.billingDetails.zip = event.target.value" placeholder="">
      <label for="zip" :class="{ active: store.billingDetails.zip }">ZIP code</label>    
    </div>
    <div class="form-buttons">
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
import { onMounted, ref } from '@vue/runtime-core'
import { doc, getDoc, updateDoc } from "firebase/firestore"

const store = useStore()
const message = ref('')
const error = ref('')

onMounted( async () => {
  const docRef = doc(firestore, 'users', store.user.uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.data().address) {
    store.billingDetails = docSnap.data().address
  }
})

const saveAddress = async () => {
  try {
    const docRef = doc(firestore, 'users', store.user.uid)
    await updateDoc(docRef, {
      address: store.billingDetails
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

<style>

</style>