<template>
  <form @submit.prevent="changePassword" class="updatePassword">
    <div>
      <input type="password" v-model="newPassword" id="new-password" placeholder="">
      <label for="new-password">New Password</label>
    </div>
    <div>
      <input type="password" v-model="confirmPassword" id="confirm-password" placeholder="confirm `password`">
      <label for="confirm-password">Confirm Password</label>
    </div>
    <div class="form-buttons">
      <button class="btn" :disabled="newPassword.length <= 0 || confirmPassword.length <= 0">
        Change Password
      </button>
    </div>
    <div class="message" v-if="updateSuccessful">
      Password updated successfully.
    </div>
    <div class="error">
      {{ error }}
    </div>
  </form>
</template>

<script setup>
import { useStore } from '../stores/store.js'
import { ref } from '@vue/reactivity'
import { updatePassword } from 'firebase/auth'

const store = useStore()
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const updateSuccessful = ref(false)

const changePassword = async () => {
  updateSuccessful.value = false
  error.value = ''
  updatePassword(store.user, newPassword.value)
  .then(() => {
    updateSuccessful.value = true
  })
  .catch(err => error.value = err.message)
}

</script>

<style lang="scss">

</style>