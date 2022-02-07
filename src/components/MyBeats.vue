<template>
  <div class="my-beats" v-for="beat in myBeats" :key="beat.id" @click="handleClick(beat)">
    <div class="my-beat">
      <div class="my-beat-name">{{ beat.name }}</div>
      <AudioPlayer />
    </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import getMyBeats from '@/composables/getMyBeats.js'
import AudioPlayer from '@/components/AudioPlayer.vue'

export default {
  components: { AudioPlayer },
  setup() {
    const store = useStore()
    const { myBeats, error } = getMyBeats()

    const handleClick = (beat) => {
      store.state.currentBeat = beat
      store.state.buttonPressed = ''
      store.state.previewUrl = beat.previewUrl
    }

    return { store, myBeats, error, handleClick }
  }
}
</script>

<style lang="scss">
  .my-beats {
    .my-beat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid red;
      width: 32rem;
    }
  }
</style>