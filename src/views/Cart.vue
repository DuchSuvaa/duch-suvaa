<template>
  <div class="container">
    <h1>Cart</h1>
    <CartItems />
    <button @click="redirect">Checkout</button>
  </div>
</template>

<script>
import CartItems from '@/components/CartItems.vue'
import { onMounted } from '@vue/runtime-core'
import { loadStripe } from '@stripe/stripe-js'

export default {
  components: { CartItems },
  setup() {
    let stripe = null;

    onMounted(async () => {
      stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)
    })

    function redirect() {
      stripe.redirectToCheckout({
        successUrl: 'http://localhost:8080/success',
        cancelUrl: 'http://localhost:8080/cancelled',
        lineItems: [
          {
            price: 'price_1JjoXiCfJNjG9p8XlX89NNrG',
            quantity: 1
          }
        ],
        mode: 'payment'
      })
    }

    return { redirect, stripe }
  }
}
</script>

<style>

</style>