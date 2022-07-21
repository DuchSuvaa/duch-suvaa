<template>
  <div class="container cart">
    <div v-if="cartItems && cartItems.length">
      <CartItems :totalPrice='totalPrice' :cartItems='cartItems' v-if="!store.state.showCheckout" />
      <Checkout :totalPrice='totalPrice' :cartItems='cartItems' v-else />
    </div>
    <div v-else id="empty-cart-message">
      <p>Your cart is empty.</p>
    </div>
    <div v-if="error">{{ error.message }}</div>
  </div>
</template>

<script setup>
import getCartItems from '@/composables/getCartItems.js'
import CartItems from '@/components/CartItems.vue'
import Checkout from '@/components/Checkout.vue'
import { useStore } from 'vuex'
import { computed, ref } from '@vue/reactivity'
    
const store = useStore()
const { cartItems, error } = getCartItems()

const totalPrice = computed( () => {
  const prices = ref(0)
  if (cartItems.value) {
    cartItems.value.forEach((item) => {
      prices.value += parseFloat(item.price)
    })
  }
  return prices.value
})

store.state.showCheckout = false

</script>

<style lang="scss">
  .cart {
    margin-top: 1rem !important;
    #empty-cart-message {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .image-small {
    max-height: 3rem;
  }
</style>