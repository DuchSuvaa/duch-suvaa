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
  components: {  },
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const handleSubmit = () => {
      useLogin(email, password)
      router.push('/add')
    }

    return { email, password, handleSubmit }
  }
}
</script>

<style>

</style>