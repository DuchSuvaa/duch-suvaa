<template>
  <div class="account-details">
    <h5>Account Details</h5>
    <div @click="passwordFormVisible = !passwordFormVisible" class="enter-password">
      Change Password
    </div>
    <transition name="open">
      <div v-if="passwordFormVisible" class="transition-element">
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
          <div class="password-error" v-if="error">
            {{ error }}
          </div>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import firebase from 'firebase/app'

export default {
  setup() {
    const passwordFormVisible = ref(false)
    const oldPassword = ref('')
    const newPassword = ref('')
    const confirmPassword = ref('')
    const error = ref('')
    const updateSuccessful = ref(false)
    const store = useStore()

    const updatePassword = async () => {
      updateSuccessful.value = false
      error.value = ''
      const credential = await firebase.auth.EmailAuthProvider.credential( store.state.user.email, oldPassword.value )
      store.state.user.reauthenticateWithCredential(credential).then( () => {
        console.log("user reauthenticated")
        if (newPassword.value.length >= 8) {
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

    return { passwordFormVisible, oldPassword, newPassword, confirmPassword, updatePassword, error, updateSuccessful }
  }
}
</script>

<style lang="scss">
@import '@/scss/_variables.scss';

  .account-details {
    width: 50%;
    .enter-password {
      cursor: pointer;
      margin-bottom: 1rem;
    }
    .updatePassword {
      .password-error {
        margin-top: 1rem;
        color: map-get($red, 'darken-2')
      }
    }
  }

  .transition-element {
    overflow: hidden;
  }

  .open-enter-from {
    opacity: 0;
    max-height: 0;
  }
  .open-enter-active {
    transition: opacity 0.5s ease-in, max-height 0.5s ease-in;
  }
  .open-enter-to {
    opacity: 1;
    max-height: 25rem;
  }
  .open-leave-from {
    opacity: 1;
    max-height: 25rem;
  }
  .open-leave-active {
    transition: opacity 0.5s ease-in, max-height 0.5s ease-in;
  }
  .open-leave-to {
    opacity: 0;
    max-height: 0;
  }
</style>