<template>
  <div class="container account">
    <AccountDetails />
    <h2 @click="handleClick" class="btn">Logout</h2>
    <div class="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../stores/store.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import AccountDetails from '../components/AccountDetails.vue'

const store = useStore()
const router = useRouter()
const error = ref('')

const handleClick = async () => {
  const res = await store.logout()
  if (res) {
    router.push('/')
  } else {
    error.value = 'Logout Error'
  }
}
</script>

<style lang="scss">
  .account {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
</style>