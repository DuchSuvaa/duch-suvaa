<template>
  <div v-for="item in cartItems" :key="item">
    Name: {{ item.name }}, Price: {{ item.price }}
  </div>
</template>

<script>
import getCartItems from '@/composables/getCartItems.js'

export default {
  setup() {
    const { cartItems, error } = getCartItems()

    return { cartItems, error }
  }

}
</script>

<style>

</style>