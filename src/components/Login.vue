<template>
  <div class="login-form">
    <form @submit.prevent="handleSubmit">
      <div class="input-field">
        <label for="login-email">e-mail</label>
        <input id="login-email" type="text" autocomplete required v-model="email">
      </div>
      <div class="input-field">
        <label for="login-password">password</label>
        <input id="login-password" type="password" autocomplete required v-model="password">
      </div>
      <div class="error">{{ error }}</div>
      <button class="btn-small">Login</button>
    </form>
  </div>
</template>

<script setup>
import { useStore } from '../stores/store.js'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = async () => {
  try {
    await store.login(email.value, password.value)
    router.push('/account')
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style lang="scss">
  .login-form {
    width: 28rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    form {
      button {
        float: right;
      }
    }
  }
</style>