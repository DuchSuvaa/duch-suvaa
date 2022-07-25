<template>
  <form @submit.prevent="changePassword" class="updatePassword">
  <div class="input-field">
    <label for="new-password">New Password</label>
    <input type="password" v-model="newPassword" id="new-password">
  </div>
  <div class="input-field">
    <label for="confirm-password">Confirm Password</label>
    <input type="password" v-model="confirmPassword" id="confirm-password">
  </div>
  <button class="btn" :disabled="newPassword.length <= 0 || confirmPassword.length <= 0">Change Password</button>
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

<style>

</style>