<template>
  <div class="account-details">
    <div @click="passwordFormVisible = !passwordFormVisible" class="enter-password">
      Change Password
    </div>
    <transition name="open">
      <div v-if="passwordFormVisible" class="transition-element">
        <ChangePassword />
      </div>
    </transition>
    <div @click="addressFormVisible = !addressFormVisible" class="enter-password">
      Update Billing Details
    </div>
    <transition name="open">
      <div v-if="addressFormVisible" class="transition-element">
        <BillingDetails />
      </div>
    </transition>
    <div v-if="store.state.user.uid == 'JalBZHRa6BTda63s8zaO4kK81Uv1'" @click="addBeatsFormVisible = !addBeatsFormVisible" class="enter-password">
      Add Beats
    </div>
    <transition name="open">
      <div v-if="addBeatsFormVisible" class="transition-element">
        <AddBeats />
      </div>
    </transition>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import BillingDetails from '@/components/BillingDetails.vue'
import ChangePassword from '@/components/ChangePassword.vue'
import AddBeats from '@/components/AddBeats.vue'
import { ref } from '@vue/reactivity'


export default {
  components: { BillingDetails, ChangePassword, AddBeats },
  setup() {
    const store = useStore()
    const passwordFormVisible = ref(false)
    const addressFormVisible = ref(false)
    const addBeatsFormVisible = ref(false)

    return { store, passwordFormVisible, addressFormVisible, addBeatsFormVisible }
  }
}
</script>

<style lang="scss">
@import '@/scss/_variables.scss';

  .account-details {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 4rem;
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
    margin-bottom: 2rem;
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