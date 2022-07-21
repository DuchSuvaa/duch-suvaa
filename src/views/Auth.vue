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

<script setup>
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import { ref } from '@vue/reactivity'

const showLogin = ref(true)

</script>

<style lang="scss">
  @import '../scss/_variables.scss';

  .auth {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 6.5rem);
    p {
      display: flex;
      justify-content: center;
      margin-top: 3rem;
      font-size: 1.4rem;
      color: map-get($grey, 'base');
      span {
        display: inline-block;
        cursor: pointer;
        margin-left: 1rem;
        color: map-get($grey, 'lighten-2');
      }
    }
    > div {
      display: flex;
      align-items: center;
      flex-direction: column;
      form {
        border: 1px solid transparent;
        border-radius: 3px;
        box-shadow: 0px 0px 20px rgba(255,255,255,.25);
        padding: 3rem;
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>