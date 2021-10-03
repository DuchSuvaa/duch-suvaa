<template>
  <div class="container">
    <h2>Add them</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" autocomplete required placeholder="name" v-model="name">
      <input type="text" autocomplete required placeholder="bpm" v-model="bpm">
      <input type="text" autocomplete required placeholder="time" v-model="time">
      <input type="text" autocomplete required placeholder="price" v-model="price">
      <input type="file" accept="audio/mp3, audio/wav" @change="handleChange" id="file-upload">
      <button>Add</button>
    </form>
    <button @click="handleClick">Logout</button>
  </div>
</template>

<script>
import addBeat from '@/composables/addBeat.js'
import { ref } from '@vue/reactivity'
import useStorage from '@/composables/useStorage.js'
import useLogout from '@/composables/useLogout.js'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { error, add } = addBeat()
    const name = ref('')
    const bpm = ref('')
    const time = ref('')
    const price = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const temporaryURL = ref('')
    const { url, filePath, uploadAudio } = useStorage()
    const { logout, logoutError } = useLogout()
    const router = useRouter()

    const handleChange = (e) => {
      const selected = e.target.files[0]
      if (selected) {
        file.value = selected
        temporaryURL.value = URL.createObjectURL(selected)
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'File cancelled.'
      }
    }

    const handleSubmit = async () => {
      if (file.value) {
        await uploadAudio(file.value)
      }
      const beat = {
        name: name.value,
        bpm: bpm.value,
        time: time.value,
        price: price.value,
        previewUrl: url.value
      }
      await add(beat)
    }

    const handleClick = async () => {
      await logout()
      if (!logoutError.value) {
        console.log('user logged out')
        router.push( '/' )
      } else {
        console.log(logoutError.value)
      }
    }

    return { name, bpm, time, price, error, add, handleChange, handleSubmit, url, filePath, uploadAudio, 
    handleClick }
  }
}
</script>

<style>

</style>