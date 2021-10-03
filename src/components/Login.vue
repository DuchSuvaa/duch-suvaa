<template>
  <h2>Zaloguj się</h2>
  <form @submit.prevent="handleSubmit">
    <input type="text" autocomplete required placeholder="email" v-model="email">
    <input type="password" autocomplete required placeholder="hasword" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Zaloguj</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '@/composables/useLogin.js'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const { login, error } = useLogin()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if (!error.value) {
        router.push('/account')
      } else {
        console.log(error.value)
      }
    }

    return { email, password, handleSubmit }
  }
}
</script>

<style>

</style>