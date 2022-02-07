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

    return { error, email, password, handleSubmit }
  }
}
</script>

<style lang="scss">
  .login-form {
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