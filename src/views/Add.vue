<template>
  <h2>Add them</h2>
  <form @submit.prevent="handleSubmit">
    <input type="text" autocomplete required placeholder="name" v-model="name">
    <input type="text" autocomplete required placeholder="bpm" v-model="bpm">
    <input type="text" autocomplete required placeholder="time" v-model="time">
    <button>Add</button>
  </form>
</template>

<script>
import addBeat from '@/composables/addBeat.js'
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const { error, add } = addBeat()
    const name = ref('')
    const bpm = ref('')
    const time = ref('')

    const handleSubmit = async () => {
      console.log("time")
      const beat = {
        name: name.value,
        bpm: bpm.value,
        time: time.value
      }
      await add(beat)
    }

    return { name, bpm, time, error, add, handleSubmit }
  }
}
</script>

<style>

</style>