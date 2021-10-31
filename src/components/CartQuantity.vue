<template>
  <span v-if="cartQuantity">{{ cartQuantity }}</span>
</template>

<script>
import getCartItems from '@/composables/getCartItems.js'

export default {
  setup() {
    const { cartQuantity } = getCartItems()

    return { cartQuantity }
 }
}
</script>

<style>

</style>