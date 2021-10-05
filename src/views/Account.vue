<template>
  <div class="container">
    <AddBeats v-if="user.uid == '4ELEkqsFDkYFmwAfJpQeIny3zj12'" />
    <AccountDetails v-else />
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

<style>

</style>