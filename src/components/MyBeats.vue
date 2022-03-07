<template>
  <div class="my-beats">
    <audio :src="store.state.previewUrl" id="audioPlayer"></audio>
    <div class="my-beat" v-for="beat in myBeats" :key="beat.id" @click="handleClick(beat)" :class="{ my_beat_active : activeBeat === beat.id }">
      <div class="my-beat-col-1">
        <div class="my-beat-image" @click="previewBeat(beat.id)">
          <img :src="beat.imageUrl" alt="">
          <div v-show="activeBeat === beat.id && (button === null || button === 'pause')" class="button-play">
            <svg width="13" height="18" viewBox="0 0 13 18" xmlns="http://www.w3.org/2000/svg">
            <path stroke="black" stroke-width="1px" d="M0 1.90857V16.0914C0 16.8981 0.905977 17.3728 1.56921 16.9136L11.8124 9.82219C12.3868 9.42454 12.3868 8.57546 11.8124 8.17781L1.56921 1.08638C0.905979 0.627216 0 1.10191 0 1.90857Z" fill="#0E0E0E"/>
            </svg>
          </div>
          <div v-show="activeBeat === beat.id && button === 'play'">
            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8.5" y="0.5" width="4" height="14" rx="0.5" fill="#0E0E0E" stroke="#0E0E0E"/>
            <rect x="0.5" y="0.5" width="4" height="14" rx="0.5" fill="#0E0E0E" stroke="#0E0E0E"/>
            </svg>
          </div>
        </div>
        <div class="my-beat-name">{{ beat.name }} <span>{{ beat.bpm + " BPM"}}</span></div>
      </div>
      <button class="my-beat-download-link">
        <svg width="12px" height="12px" viewBox="0 -19 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
          <g fill="white">
            <polygon points="63.9945638 0 0 40.7712563 63.9945638 81.5425125 128 40.7712563"></polygon>
            <polygon points="192.000442 0 128 40.7750015 192.000442 81.5500031 256.000885 40.7750015"></polygon>
            <polygon points="0 122.321259 63.9945638 163.092516 128 122.321259 63.9945638 81.5500031"></polygon>
            <polygon points="192 81.5500031 128 122.324723 192 163.099442 256 122.324723"></polygon>
            <polygon points="64 176.771256 128.005436 217.542513 192 176.771256 128.005436 136"></polygon>
          </g>
        </svg>
        <div v-if="activeBeat === beat.id">
          <a :href="beat.downloadLink" target="_blank">Download</a>
        </div>
        <div v-else>
          <span>Download</span> 
        </div>
      </button>
    </div>

  </div>
</template>

<script>
import { useStore } from 'vuex'
import getMyBeats from '@/composables/getMyBeats.js'
import { onBeforeUnmount } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const store = useStore()
    const { myBeats, error } = getMyBeats()
    const audioPlayerSelect = ref(null)
    const activeBeat = ref(null)
    const button = ref(null)

    const previewBeat = (id) => {
      if (activeBeat.value && activeBeat.value === id) {
        if (button.value === 'play') {
          document.getElementById('audioPlayer').pause()
          button.value = 'pause'
        } else {
          document.getElementById('audioPlayer').play().then( () => button.value = 'play')
        }
      }
    }

    onBeforeUnmount( () => {
      store.state.buttonPressed = ''     
    })
    
    const handleClick = (beat) => {
      if (activeBeat.value != beat.id) {
        activeBeat.value = beat.id
        button.value = null
        store.state.currentBeat = beat
        store.state.buttonPressed = ''
        store.state.previewUrl = beat.previewUrl
        audioPlayerSelect.value = beat.name
      }
    }

    return { store, myBeats, activeBeat, error, handleClick, audioPlayerSelect, previewBeat, button }
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
      .my-beat-col-1 {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        .my-beat-image {
          width: 3rem;
          height: 3rem;
          margin-right: 1rem;
          position: relative;
          img {
            width: 100%;
          }
          div {
            svg {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) scale(.85);
              path, rect {
                fill: white;
              }
            }
          }
          .button-play { 
            svg {
              transform: translate(-40%, -50%) scale(.85);
            }
          }
        }
        .my-beat-name {
          font-size: 1.4rem;
          span {
            display: inline-block;
            color: map-get($grey, 'base');
            margin-left: 0.5rem;
          }
        }
      }
      .my-beat-download-link {
        background-color: map-get($grey, 'base');
        padding: 0.5rem;
        display: flex;
        align-items: center;
        border: 1px solid transparent;
        border-radius: 2px;
        a, span {
          display: block;
          color: white;
          text-transform: uppercase;
          font-size: 1rem;
          margin-left: 0.4rem;
          font-weight: 600;
          cursor: pointer;
        }
      }
      &:hover {
        background-color: #333;
      }
    }
    .my_beat_active {
      background-color: #333;
      .my-beat-download-link {
        background-color: #0061FF;     
      }
    }
  }
</style>