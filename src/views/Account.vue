<template>
  <div class="container account">
    <AccountDetails />
    <AddBeats v-if="user.uid == 'kyEW3RKazMZb5NBhrPB6A5adU0n1'" />
    <h2 @click="handleClick" class="btn">Logout</h2>
  </div>
</template>

<script>
import getUser from '@/composables/getUser.js'
import AddBeats from '@/components/AddBeats.vue'
import AccountDetails from '@/components/AccountDetails.vue'
import useLogout from '@/composables/useLogout.js'
import { useRouter } from 'vue-router'

export default {
  components: { AddBeats, AccountDetails },
  setup() {
    const { user } = getUser()
    const { logout, logoutError } = useLogout()
    const router = useRouter()

    const handleClick = async () => {
      router.push( '/' )
      await logout()
      if (!logoutError) {
        console.log("user logged out")
      } else {
        console.log(logoutError.value)
      }
    }

    return { user, handleClick }
  }
}
</script>

<style lang="scss">
  .account {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }
</style>