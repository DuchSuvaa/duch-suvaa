<template>
  <form @submit.prevent="updatePassword" class="updatePassword">
  <div class="input-field">
    <label for="old-password">Old Password</label>
    <input type="password" v-model="oldPassword" id="old-password">
  </div>
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
  <div class="error" v-if="error">
    {{ error }}
  </div>
</form>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'
import { EmailAuthProvider } from 'firebase/auth'
import { getAuth, reauthenticateWithCredential } from 'firebase/auth'

const store = useStore()
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const updateSuccessful = ref(false)

const updatePassword = async () => {
  updateSuccessful.value = false
  error.value = ''

  const credential = EmailAuthProvider.credential( store.state.user.email, oldPassword.value )

  const auth = getAuth();
  const user = auth.currentUser 
      
  reauthenticateWithCredential(user, credential).then( () => {
    console.log("user reauthenticated")

    if (newPassword.value.length >= 8) {
      console.log(newPassword.value)
      console.log(confirmPassword.value)
      if (newPassword.value === confirmPassword.value) {
        store.state.user.updatePassword(newPassword.value).then( () => {
          updateSuccessful.value = true
          setTimeout( () => {
            updateSuccessful.value = false
          }, 10000)
        })
      } else {
        error.value = 'Passwords don\'t match.'
      }
    } else {
      error.value = 'Password has to be at least 8 characters long.'
    }
  }).catch( () => {
    error.value = "Please provide your current password."
    return
  })
}

</script>

<style>

</style>