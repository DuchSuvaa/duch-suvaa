<template>
  <div class="account-details">
    <div @click="myBeatsVisible = !myBeatsVisible" class="my-beats-container">
      My Beats
    </div>
    <transition name="open">
      <div v-if="myBeatsVisible" class="transition-element">
        <MyBeats />
      </div>
    </transition>
    <div @click="passwordFormVisible = !passwordFormVisible" class="enter-password-container">
      Change Password
    </div>
    <transition name="open">
      <div v-if="passwordFormVisible" class="transition-element">
        <ChangePassword />
      </div>
    </transition>
    <div @click="addressFormVisible = !addressFormVisible" class="update-billing-details-container">
      Update Billing Details
    </div>
    <transition name="open">
      <div v-if="addressFormVisible" class="transition-element">
        <BillingDetails />
      </div>
    </transition>
    <div v-if="store.user && store.user.uid == 'uOvhDI4IUafjLEZtGTvZH4EJTav1'" @click="addBeatsFormVisible = !addBeatsFormVisible" class="add-beats-container">
      Add Beats
    </div>
    <transition name="open">
      <div v-if="addBeatsFormVisible" class="transition-element">
        <AddBeats />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useStore } from '../stores/store.js'
import MyBeats from '../components/MyBeats.vue'
import ChangePassword from '../components/ChangePassword.vue'
import BillingDetails from '../components/BillingDetails.vue'
import AddBeats from '../components/AddBeats.vue'
import { ref } from '@vue/reactivity'

const store = useStore()
const myBeatsVisible = ref(false)
const passwordFormVisible = ref(false)
const addressFormVisible = ref(false)
const addBeatsFormVisible = ref(false)

</script>

<style lang="scss">
@import '../scss/_variables.scss';

  .account-details {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 4rem;
    .enter-password-container, .my-beats-container, .update-billing-details-container, .add-beats-container {
      cursor: pointer;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: 600;
      font-size: $enlarged-font-size;
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