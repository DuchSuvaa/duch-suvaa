<template>
  <span v-if="cartQuantity">{{ cartQuantity }}</span>
</template>

<script setup>
import getCartItems from '../composables/getCartItems.js'

const { cartQuantity } = getCartItems()

</script>

<style>

</style>