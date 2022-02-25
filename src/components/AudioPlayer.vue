<template>
  <div class="audio-player">
    <audio :src="store.state.previewUrl" id="audioPlayer"></audio>
    <div class="controls">
      <div class="play" @click="play" :class="{ controls_active : store.state.buttonPressed === 'play' }">
        <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1.90857V16.0914C0 16.8981 0.905977 17.3728 1.56921 16.9136L11.8124 9.82219C12.3868 9.42454 12.3868 8.57546 11.8124 8.17781L1.56921 1.08638C0.905979 0.627216 0 1.10191 0 1.90857Z" fill="#0E0E0E"/>
        </svg>
      </div>
      <div class="pause" @click="pause" :class="{ controls_active : store.state.buttonPressed === 'pause' }">
        <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8.5" y="0.5" width="4" height="14" rx="0.5" fill="#0E0E0E"/>
        <rect x="0.5" y="0.5" width="4" height="14" rx="0.5" fill="#0E0E0E"/>
        </svg>
      </div>
      <div class="stop" @click="stop" :class="{ controls_active : store.state.buttonPressed === 'stop' }">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="12" height="12" rx="0.5" fill="#0E0E0E"/>
        </svg>
      </div>
    </div>
    <div id="volume" v-show="showVolumeControl">
      <div id="volume-control" v-show="volumeControl" @click="setVolume">
        <div id="volume-fader"></div>
      </div>
      <svg @click="volumeControl = !volumeControl" width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.3996 1.56309C14.3996 1.28726 14.2512 1.03275 14.0112 0.896815C13.7712 0.760872 13.4766 0.764525 13.2401 0.906371L5.76459 5.38873H2.91364C1.64635 5.38873 0.616455 6.41472 0.616455 7.68493V13.8068C0.616455 15.077 1.64635 16.1029 2.91364 16.1029H5.76459L13.2401 20.5853C13.4766 20.7271 13.7712 20.7308 14.0112 20.5948C14.2512 20.459 14.3996 20.2045 14.3996 19.9286V1.56309Z" fill="black"/>
      <path d="M21.036 5.64709C20.3311 5.64709 19.7598 6.21848 19.7598 6.92331V14.5806C19.7598 15.2854 20.3311 15.8568 21.036 15.8568C21.7408 15.8568 22.3122 15.2854 22.3122 14.5806V6.92331C22.3122 6.21848 21.7408 5.64709 21.036 5.64709Z" fill="black"/>
      <path d="M16.9312 8.19946C16.3789 8.19946 15.9312 8.64718 15.9312 9.19946V12.3043C15.9312 12.8566 16.3789 13.3043 16.9312 13.3043H17.4836C18.0359 13.3043 18.4836 12.8566 18.4836 12.3043V9.19946C18.4836 8.64718 18.0359 8.19946 17.4836 8.19946H16.9312Z" fill="black"/>
      <path d="M24.8646 4.37085C24.1598 4.37085 23.5884 4.94223 23.5884 5.64706V15.8568C23.5884 16.5616 24.1598 17.133 24.8646 17.133C25.5694 17.133 26.1408 16.5616 26.1408 15.8568V5.64706C26.1408 4.94223 25.5694 4.37085 24.8646 4.37085Z" fill="black"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import Hammer from 'hammerjs' 
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'

export default {
  props: { showVolumeControl: { default: false } },
  setup() {
    const store = useStore()
    const volumeControl = ref(false)

    const play = () => {
      document.getElementById('audioPlayer').play()
      store.state.buttonPressed = 'play'
    }

    const pause = () => {
      document.getElementById('audioPlayer').pause()
      store.state.buttonPressed = 'pause'
    }

    const stop = () => {
      document.getElementById('audioPlayer').pause()
      document.getElementById('audioPlayer').currentTime = 0;
      store.state.buttonPressed = ''
    }

    onMounted( () => {
      const mc = new Hammer(document.getElementById('volume-control'))
      mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

      mc.on('panup pandown', (e) => {
        let elementOffsetTop = document.getElementById('volume-control').getBoundingClientRect().top
        let clickOffsetTop = e.center.y
        let clickDistanceFromTop = Math.round(elementOffsetTop - clickOffsetTop)
        let elementHeight = document.getElementById('volume-control').offsetHeight
        let clickedHeight = ((elementHeight + clickDistanceFromTop) / elementHeight).toFixed(2)
        document.getElementById('audioPlayer').volume = clickedHeight
        document.getElementById('volume-fader').style.height = clickedHeight * 100 + "%" 
      })
    })

    onBeforeUnmount( () => {
       store.state.buttonPressed = ''     
    })

    const setVolume = (e) => {
      let elementOffsetTop = document.getElementById('volume-control').getBoundingClientRect().top
      let clickOffsetTop = e.clientY
      let clickDistanceFromTop = Math.round(elementOffsetTop - clickOffsetTop)
      let elementHeight = document.getElementById('volume-control').offsetHeight
      let clickedHeight = ((elementHeight + clickDistanceFromTop) / elementHeight).toFixed(2)
      document.getElementById('audioPlayer').volume = clickedHeight
      document.getElementById('volume-fader').style.height = clickedHeight * 100 + "%"   
    }

    document.addEventListener("click", function(event) {
      if (event.target.closest("#volume")) return
      if (volumeControl.value === true) {
        volumeControl.value = false
      }
    })
    
    return { store, play, pause, stop, volumeControl, setVolume }
  }
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .audio-player {
    padding: 0.6rem 1.2rem;
    background-color: #383838;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 7rem;
      .play {
        svg {
          transform: scale(.9);
          filter: $player-button-shadow;
        }       
      }
      .pause {
        svg {
          filter: $player-button-shadow;
        }
      }
      .stop {
        svg {
          filter: $player-button-shadow;
        }
      }
      > div {
        display: flex;
        align-items: center;
        &:hover {
          cursor: pointer;
          path, rect, svg {
            fill: map-get($blue, 'darken-2'); 
          }
        }
      }
      .controls_active {
        path, rect, svg {
          fill: map-get($blue, 'darken-2'); 
        }        
      }
    }
    #volume {
      padding: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      svg {
        transform: scale(0.7);
        filter: $player-button-shadow;
      }
      #volume-control {
        height: 11rem;
        width: 100%;
        position: absolute;
        bottom: 2.7rem;
        left: 0;
        border: 1px solid transparent;
        border-radius: 2px;
        background-color: #626262;
        #volume-fader {
          height: 100%;
          background-color: map-get($red, 'darken-2');
          position: absolute;
          bottom: 0;
          width: 100%;
        }
      }
    }
  }
</style>