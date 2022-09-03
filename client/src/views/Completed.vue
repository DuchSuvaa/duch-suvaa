<template>
  <div class="container completed">
    <h2>Order Completed</h2>
    <p>{{ payment_intent_status }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core'
import { loadStripe } from '@stripe/stripe-js'

let stripe = null
let payment_intent_status = ref(null)

onMounted(async() => {
  const params = new URLSearchParams(window.location.search)
  const secret = params.get("payment_intent_client_secret")
  stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)
  stripe.retrievePaymentIntent(secret).then( (res) => {
    payment_intent_status.value = res.paymentIntent.status
  })
})

</script>

<style>

</style>