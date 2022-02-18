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
        <div class="beat-add-to-cart" @click="handleButton(beat)">
          <button class="add-to-cart-button">
            <div>{{ "$" + beat.price / 100}}</div>
            <i class="material-icons">add_shopping_cart</i>
          </button>
        </div>
      </div>
    </div>
    <AddToCart v-if="store.state.showAddToCartPopup === true" />
</template>

<script>
import AddToCart from '@/components/AddToCart.vue'
import getBeats from '@/composables/getBeats.js'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'

export default {
  components: { AddToCart },
  setup() {
    const store = useStore()
    const { beats, error } = getBeats()
    const selectedBeat = ref('')

    const handleClick = (beat) => {
      selectedBeat.value = beat.id
      store.state.currentBeat = beat
      store.state.buttonPressed = ''
      store.state.previewUrl = beat.previewUrl
    }

    const handleButton = (beat) => {
      selectedBeat.value = beat.id
      store.state.currentBeat = beat
      store.state.showAddToCartPopup = true
    }

    return { store, beats, error, selectedBeat, handleClick, handleButton }
  }
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

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
          border: 1px solid transparent;
          border-radius: 3px;
          background-color: map-get($red, 'darken-3');
          cursor: pointer;
          &:hover {
            background-color: map-get($red, 'darken-4');
          }
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
    .activeBeat {
      background-color: rgb(41, 41, 41) !important;
      > div {
        color: map-get($grey, 'lighten-2');
        font-weight: 700;
      }
      .add-to-cart-button {
        font-weight: 400;
      }
    }
    .beat {
      cursor: pointer;
      &:hover {
        background-color: rgb(37, 37, 37);
        > div {
          color: map-get($grey, 'lighten-2');
        }
      }
    }
  }

</style>