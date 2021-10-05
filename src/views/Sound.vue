<template>
  <div class="sound container">
    <h1>This is a sound page</h1>
    <BeatPreview :beat="currentBeat" />
    <div v-for="beat in beats" :key="beat.name" @click="currentBeat = beat">
      <div>{{ beat.name }}</div>
      <div>{{ beat.bpm }}</div>
      <div>{{ beat.time }}</div>
      <div>{{ beat.previewUrl }}</div>
      <div>{{ beat.price }}</div>
    </div>
  </div>
</template>

<script>
import BeatPreview from '@/components/BeatPreview.vue'
import getBeats from '@/composables/getBeats.js'
import { ref } from '@vue/reactivity'

export default ({
  components: { BeatPreview },
  setup() {
    const { beats, error } = getBeats()
    const currentBeat = ref(null)

    return { beats, error, currentBeat }
  }
})
</script>

<style lang="scss">



</style>