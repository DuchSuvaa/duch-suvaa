<template>
  <div class="register-form">
    <form @submit.prevent="handleSubmit">
      <div class="input-field">
        <label for="register-email">e-mail</label>
        <input id="register-email" type="email" required v-model="email">
      </div>
      <div class="input-field">
        <label for="register-password">password</label>
        <input id="register-password" type="password" required autocomplete v-model="password">
      </div>
      <div class="error">{{ error }}</div>
      <button class="btn-small">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { useStore } from '../stores/store.js'
import { useRouter } from 'vue-router'

const store = useStore()
const email = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = async () => {
  const res = await store.signup(email.value, password.value)
  console.log(res)
  router.push( '/' )
}
</script>

<style lang="scss">
  .register-form {
    width: 28rem;
    display: flex;
    justify-content: center;
    form {
      button {
        float: right;
      }
    }
  }
</style>