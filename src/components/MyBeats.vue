<template>
  <div class="my-beats">
    <div class="my-beat"  v-for="beat in myBeats" :key="beat.id" @click="handleClick(beat)" :class="{ my_beat_active : activeBeat === beat.id }">
      <div class="my-beat-image">
        <img :src="beat.imageUrl" alt="">
      </div>
      <div class="my-beat-name">{{ beat.name }}</div>
      <div class="my-beat-download-link">
        <a :href="beat.downloadLink" target="_blank">Download</a>
      </div>
      <div class="my-beat-audio-player">
        <AudioPlayer v-if="beat.name === audioPlayerSelect" :showVolumeControl="false" />
      </div>
    </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import getMyBeats from '@/composables/getMyBeats.js'
import AudioPlayer from '@/components/AudioPlayer.vue'
import { ref } from '@vue/reactivity'

export default {
  components: { AudioPlayer },
  setup() {
    const store = useStore()
    const { myBeats, error } = getMyBeats()
    const audioPlayerSelect = ref(null)
    const activeBeat = ref(null)
    
    const handleClick = (beat) => {
      activeBeat.value = beat.id
      store.state.currentBeat = beat
      store.state.buttonPressed = ''
      store.state.previewUrl = beat.previewUrl
      audioPlayerSelect.value = beat.name
    }

    return { store, myBeats, activeBeat, error, handleClick, audioPlayerSelect }
  }
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .my-beats {
    .my-beat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 35rem;
      border-bottom: 1px solid #333;
      cursor: pointer;
      .my-beat-image {
        width: 3rem;
        height: 3rem;
        padding: 0.6rem;
        img {
          width: 100%;
        }
      }
      .my-beat-name {
        font-size: 1.2rem;
      }
      .my-beat-audio-player {
        width: 9.5rem;
      }
      &:hover {
        background-color: #333;
      }
    }
    .my_beat_active {
      background-color: #333;
    }
  }
</style>