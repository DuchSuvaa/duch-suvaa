<template>
  <div class="sound container">
    <BeatPreview :beat="currentBeat" />
    <div class="table-header">
      <div class="beat-name">Name</div>
      <div class="beat-bpm">BPM</div>
      <div class="beat-time">Time</div>
      <div class="beat-get">Get</div>
    </div>
    <div v-for="beat in beats" :key="beat.name" @click="currentBeat = beat" class="beat">
      <div class="beat-name">{{ beat.name }}</div>
      <div class="beat-bpm">{{ beat.bpm }}</div>
      <div class="beat-time">{{ beat.time }}</div>
      <div class="beat-get">
        <div>{{ beat.price }}</div>
        <a :href="beat.previewUrl" target="_blank">
          <i class="material-icons">file_download</i>
        </a>
        <div>
          <i class="material-icons" @click="handleClick(beat)">add_shopping_cart</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BeatPreview from '@/components/BeatPreview.vue'
import getBeats from '@/composables/getBeats.js'
import useCart from '@/composables/addToCart.js'
import { ref } from '@vue/reactivity'

export default ({
  components: { BeatPreview },
  setup() {
    const { beats, error } = getBeats()
    const currentBeat = ref(null)
    const { addToCart } = useCart() 

    const handleClick = (beat) => {
      addToCart(beat)
    }

    return { beats, error, currentBeat, handleClick }
  }
})
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .sound {
    margin-top: 1.4rem !important;
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
        a {
          line-height: 1;
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

</style>