<template>
  <div class="container checkout">
    <div class="return" @click="store.showCheckout = false">
      <i class="material-icons">arrow_back</i>
      &nbsp;Return to Cart
    </div>
    <BillingDetails />
    <div class="checkout-payment-methods">
      <div id="payment-element"></div>
    </div>
    <div class="checkout-buttons" v-if="loading === false">
      <button class="waves-effect waves-light btn btn-send" :class="{ dis: loading }" @click="handleSubmit">
        {{ loading ? "Loading..." : "Pay $" + (totalPrice * 0.01).toFixed(2) }}
      </button>
    </div>
    <div class="loader" v-else>
      <Loader />
    </div>
    <div class="message" v-if="message">
      {{ message }}
    </div>
    <div class="error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import BillingDetails from '../components/BillingDetails.vue'
import { onMounted, ref } from '@vue/runtime-core'
import { loadStripe } from '@stripe/stripe-js'
import { useStore } from '../stores/store.js'
import Loader from '../components/Loader.vue'
import { defineProps } from 'vue'

defineProps({
  cartItems: Object,
  totalPrice: Number
})

const store = useStore()
let stripe = null
let elements = null
let loading = ref(true)
const message = ref('')
const error = ref('')

onMounted(async () => {
  stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  try {
    // const response = await fetch("https://duch-suvaa-backend.herokuapp.com/stripe", {
    const response = await fetch("http://localhost:8000/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: store.user.uid,
        userEmail: store.user.email
      })
    })
    const { secret } = await response.json()
    console.log(secret)

    const options = {
      appearance: {
        theme: 'night'
      },
      clientSecret: secret,
    }
    elements = stripe.elements(options);
    const paymentElement = elements.create("payment")
    paymentElement.mount("#payment-element")
    loading.value = false
  } catch (error) {
    console.log(error)
  }

})

async function handleSubmit() {
  loading.value = true
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location}/completed`,
    },
    // Uncomment below if you only want redirect for redirect-based payments
    // redirect: 'if_required'
  })
  if (error) return
  loading.value = false
}
</script>

<style lang="scss">
  @import '../scss/_variables.scss';

  .loader { 
    width: 100%; 
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 4rem auto;
  }

  .checkout {
    width: 50% !important;
    @media (max-width: 1000px) { width: 75% !important; }
    @media (max-width: 700px) { width: 100% !important; }
    padding-top: 2rem;
    .return {
      margin-bottom: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      i {
        font-size: 1.2rem;
      }
    }
    #checkout-form {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      grid-template-rows: auto;
      grid-gap: 2rem;
      margin-top: 1rem;
      > div:nth-of-type(odd) {
        grid-column: 1/7;
      }
      > div:nth-of-type(even) {
        grid-column: 7/13;        
      }
      .checkout-payment-methods, .checkout-buttons {
        grid-column: 1/13 !important;
      }
      input {
        color: white;
      }
    }
    .checkout-payment-methods {
      margin-top: 2rem;
      margin-bottom: 2rem;
      #card-mount {
        width: 30rem;
      }
    }
  }

</style>