<template>
  <div class="container">
    <h1>Cart</h1>
    <CartItems />
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <button @click="submit">Pay now!</button>
  </div>
</template>

<script>
import CartItems from '@/components/CartItems.vue'
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { ref } from '@vue/reactivity';

export default {
  components: { CartItems, StripeCheckout },
  setup() {
    console.log(StripeCheckout);
    const publishableKey = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY
    console.log(publishableKey)

    const lineItems = ref([
      {
        price: 'price_1JjoXiCfJNjG9p8XlX89NNrG', // The id of the one-time price you created in your Stripe dashboard
        quantity: 1,      
      }
    ])

    const successURL = ref('https://bartosz-sowa.pl/duch-test/success')
    const cancelURL = ref('https://bartosz-sowa.pl/duch-test/cancelled')

    return { publishableKey, lineItems, successURL, cancelURL }
  },  
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
}
</script>

<style>

</style>