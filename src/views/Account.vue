<template>
  <div class="container account">
    <AccountDetails />
    <h2 @click="handleClick" class="btn">Logout</h2>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import AccountDetails from '@/components/AccountDetails.vue'
import useLogout from '@/composables/useLogout.js'
import { useRouter } from 'vue-router'

export default {
  components: { AccountDetails },
  setup() {
    const store = useStore()
    const user = store.state.user
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