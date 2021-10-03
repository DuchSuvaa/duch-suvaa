<template>
  <AddBeats v-if="user.uid == '4ELEkqsFDkYFmwAfJpQeIny3zj12'" />
  <AccountDetails v-else />
  <h2 @click="handleClick">Logout</h2>
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
      await logout()
      if (!logoutError.value) {
        console.log('user logged out')
        router.push( '/' )
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