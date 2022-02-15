<template>
    <div class="beats-playlist">
      <div class="table-header">
        <div class="beat-name">Name</div>
        <div class="beat-bpm">BPM</div>
        <div class="beat-time">Time</div>
        <div class="beat-add-to-cart">Get</div>
      </div>
      <div v-for="beat in beats" :key="beat.name" @click="handleClick(beat)" class="beat" :class="{ activeBeat: selectedBeat === beat.id }">
        <div class="beat-name">{{ beat.name }}</div>
        <div class="beat-bpm">{{ beat.bpm }}</div>
        <div class="beat-time">{{ beat.time }}</div>
        <div class="beat-add-to-cart" @click="add(beat)">
          <div class="add-to-cart-button">
            <div>{{ "$" + beat.price / 100}}</div>
            <i class="material-icons">add_shopping_cart</i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import getBeats from '@/composables/getBeats.js'
import useCart from '@/composables/addToCart.js'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const store = useStore()
    const { beats, error } = getBeats()
    const { addToCart } = useCart()
    const selectedBeat = ref('')

    const handleClick = (beat) => {
      selectedBeat.value = beat.id
      store.state.currentBeat = beat
      store.state.buttonPressed = ''
      store.state.previewUrl = beat.previewUrl
    }

    const add = (beat) => {
      addToCart(beat)
    }

    return { beats, error, selectedBeat, handleClick, add }
  }
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .activeBeat {
    background-color: rgb(42, 42, 42);
  }

  .beats-playlist {
    margin-left: 2rem;
    .table-header {
      > div {
        color: map-get($grey, 'lighten-2') !important;
        font-weight: 800;
      }
    }
    .table-header, .beat {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      width: 100% !important;
      padding: 1rem;
      > div {
        font-size: 1.4rem;
        color: map-get($grey, 'base');
        display: flex;
        align-items: center;
      }
      .beat-name {
        grid-column: 1/4;
        color: map-get($grey, 'lighten-2');
      }
      .beat-bpm {
        grid-column: 5/7;
      }
      .beat-time {
        grid-column: 8/10;
      }
      .beat-add-to-cart {
        grid-column: 11/13;
        justify-content: flex-end;
        .add-to-cart-button {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0.2rem 0.6rem;
          border: 1px solid map-get($red, 'darken-4');
          border-radius: 3px;
          background-color: map-get($red, 'darken-4');
          > div {
            font-size: 1.4rem;
            color: white;
          }
          i {
            margin-left: 0.4rem;
            transform: scale(0.65);
            color: white;
          }
        }
      }
    }
    .table-header {
      user-select: none;
      > div {
        justify-content: flex-start !important;
        text-transform: uppercase;
        font-size: 1.2rem;
      }
      .beat-add-to-cart {
        justify-content: flex-end !important;
      }
    }
    .beat {
      cursor: pointer;
      &:hover {
        background-color: rgb(42, 42, 42);
        > div {
          color: map-get($grey, 'lighten-2');
        }
      }
    }
  }
</style>