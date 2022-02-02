<template>
  <div class="sound-header">
    <div class="sound-header-image container">
      <img src="@/assets/sound-header.png" modernize />
      <div class="sound-heading">
        <h1>Sound</h1>
      </div>
    </div>
  </div>
  <div class="container sound">
    <BeatPreview :beat="currentBeat" />
    <div class="beats-playlist">
      <div class="table-header">
        <div class="beat-name">Name</div>
        <div class="beat-bpm">BPM</div>
        <div class="beat-time">Time</div>
        <div class="beat-get">Get</div>
      </div>
      <div v-for="beat in beats" :key="beat.name" @click="handleClick(beat)" class="beat">
        <div class="beat-name">{{ beat.name }}</div>
        <div class="beat-bpm">{{ beat.bpm }}</div>
        <div class="beat-time">{{ beat.time }}</div>
        <div class="beat-get">
          <a :href="beat.previewUrl" target="_blank">
            <i class="material-icons">file_download</i>
          </a>
          <div class="add-to-cart" @click="add(beat)">
            <div>{{ "$" + beat.price / 100}}</div>
            <i class="material-icons">add_shopping_cart</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BeatPreview from '@/components/BeatPreview.vue'
import getBeats from '@/composables/getBeats.js'
import useCart from '@/composables/addToCart.js'
import { useStore } from 'vuex'

export default ({
  components: { BeatPreview },
  setup() {
    const store = useStore()
    const { beats, error } = getBeats()
    const { addToCart } = useCart() 

    const handleClick = (beat) => {
      store.state.currentBeat = beat
      store.state.buttonPressed = ''
      store.state.previewUrl = beat.previewUrl
    }

    const add = (beat) => {
      addToCart(beat)
    }

    return { beats, error, handleClick, add }
  }
})
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .sound-header {
    background-image: url('../assets/sound-header-bg.png');
    background-size: cover;
    margin-bottom: 2rem;
    .sound-header-image {
      position: relative;
      picture {
        img {
          width: 100%;
        }
      }
      .sound-heading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        h1 {
          width: 100%;
          text-align: center;
          padding: 0 2rem;
          text-shadow: $heading-text-shadow;
          color: map-get($grey, 'darken-4');
          font-family: monsters;
          span {
            display: inline-block;
            color: map-get($red, 'darken-4');
          }
        }
      }
    }
  }

  .sound {
    margin-top: 1.4rem !important;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    .beat-preview {
      grid-column: 1/4;
    }
    .beats-playlist {
      grid-column: 4/13;
      .table-header, .beat {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        width: 100% !important;
        border: 1px solid black;
        padding: 1rem;
        border-bottom: 1px solid map-get($grey, 'darken-3'); 
        .beat-name {
          grid-column: 1/4;
        }
        .beat-bpm {
          grid-column: 4/6;
        }
        .beat-time {
          grid-column: 6/8;
        }
        .beat-get {
          grid-column: 11/13;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .add-to-cart {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0.2rem 0.6rem;
            border: 1px solid map-get($red, 'darken-4');
            border-radius: 3px;
            background-color: map-get($red, 'darken-4');
            > div {
              font-size: 1.4rem;
            }
            i {
              margin-left: 0.4rem;
              transform: scale(0.65);
            }
          }
          a {
            line-height: 1;
            i {
              display: block;
            }
          }
          div {
            line-height: 1;
          }
        }
      }
      .table-header {
        user-select: none;
      }
      .beat {
        cursor: pointer;
        &:hover {
          background-color: map-get($grey, 'darken-3')
        }
      }
    }
  }

</style>