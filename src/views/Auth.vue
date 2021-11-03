<template>
  <div class="container auth">
    <div v-if="showLogin">
      <Login />
      <p>No account? <span @click="showLogin = false">Register</span></p>
    </div>
    <div v-else>
      <Register />
      <p>Already have an account? <span @click="showLogin = true">Log in</span></p>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import { ref } from '@vue/reactivity'

export default {
  components: { Login, Register },
  setup() {
    const showLogin = ref(true)

    return { showLogin }
  }
}
</script>

<style lang="scss">
  p {
    span {
      display: inline-block;
      cursor: pointer;
    }
  }
</style>