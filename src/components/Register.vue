<template>
  <h2>Załóż konto</h2>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="display name" v-model="displayName">
    <input type="email" required placeholder="email" v-model="email">
    <input type="password" required autocomplete placeholder="hasword" v-model="password">
    <div class="error">{{ error }}</div>
    <button>Załóż</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '../composables/useSignup.js'
import { useRouter } from 'vue-router'

export default {
  setup() {

    const { error, signup } = useSignup()

    const displayName = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const handleSubmit = async () => {
      await(signup(email.value, password.value, displayName.value))
      router.push( '/' )
    }

    return { handleSubmit, email, password, error, displayName }
  }
}
</script>

<style>

</style>