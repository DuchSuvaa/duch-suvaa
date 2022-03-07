<template>
  <div class="add-to-cart-backdrop" @click="closePopup">
    <div class="add-to-cart-popup" @click.stop>
      <div class="add-to-cart-beat-image">
        <img :src="store.state.currentBeat.imageUrl" />
      </div>
      <div class="add-to-cart-beat-details">
        <div class="add-to-cart-beat-details-name">
          {{ store.state.currentBeat.name }}
        </div>
        <div class="add-to-cart-beat-details-bpm">
          <span>Tempo:</span> <p>{{ store.state.currentBeat.bpm + " BPM" }}</p>
        </div>
        <div class="add-to-cart-beat-details-price" v-if="selectedLicence === 'shared'">
          <span>Price:</span> <p>{{ "$" + (store.state.currentBeat.price * 0.01).toFixed(2) /2 }}</p>
        </div>
        <div class="add-to-cart-beat-details-price" v-else>
          <span>Price:</span> <p>{{ "$" + (store.state.currentBeat.price * 0.01).toFixed(2) }}</p>
        </div>
      </div>
      <div class="licence-info" v-if="!error">
        <div v-if="selectedLicence === 'full'">
          <div class="licence-name">Full Licence</div>
          <div class="description">
            You will become the exclusive owner.
            You will get the full-lenght beat and all the separate tracks in .wav format.
          </div>
        </div>
        <div v-if="selectedLicence === 'shared'">
          <div class="licence-name">
            Shared Licence
          </div>
          <div class="description">
            You will share the beat with other licence holders.
            You will get the full-lenght beat in .wav format.
          </div>
        </div>
        <div v-if="selectedLicence === ''">
          <div class="licence-name">
            Select licence type:
          </div>
        </div>
      </div>
      <div class="error" v-else>{{ error }}</div>
      <div class="add-to-cart-licence" v-if="!error">
        <div class="add-to-cart-licence-shared" 
        :class="{ activeButton : selectedLicence === 'shared' }" 
        @click="selectedLicence = 'shared'">
          Shared
        </div>
        <div class="add-to-cart-licence-full" v-if="store.state.currentBeat.licence !== 'shared'"
        :class="{ activeButton : selectedLicence === 'full' }" 
        @click="selectedLicence = 'full'">
          Full
        </div>
        <div v-else class="add-to-cart-licence-full unavailable">Full</div>
      </div>
      <div class="add-to-cart-confirm-button">
        <button :disabled="selectedLicence === ''" class="add" @click="add(store.state.currentBeat)">
          <i class="material-icons">add_shopping_cart</i> Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import useCart from '@/composables/addToCart.js'
  import { ref } from '@vue/reactivity'
  import { onMounted } from '@vue/runtime-core'

  export default {
    setup() {
      const store = useStore()
      const { addToCart } = useCart()
      const selectedLicence = ref('')
      const error = ref(null)

      onMounted(() => {
        if (store.state.currentBeat.licence === 'shared') {
          selectedLicence.value = 'shared'
        } 
      })

      const closePopup = () => {
        store.state.showAddToCartPopup = false
      }

      const add = async (beat) => {
        const product = { ...beat, licence: selectedLicence.value }

        addToCart(product).then((result) => {
          if (result.error.value) {
            error.value = result.error.value
          } else {
            store.state.showAddToCartPopup = false
          }
        })
      }

      return { store, selectedLicence, closePopup, add, error }
    }
  }
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .add-to-cart-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    div {
      font-size: 1.4rem;      
    }
    .add-to-cart-popup {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-flow: row wrap;
      width: 32rem;
      background-color: map-get($grey, 'darken-4');
      box-shadow: 0px 0px 20px rgba(255,255,255,.25);
      padding: 1rem;
      .add-to-cart-beat-image {
        padding: 1rem;
        width: 50%;
        img {
          width: 100%;
        }
      }
      .add-to-cart-beat-details {
        width: 50%;
        padding: 1rem;
        .add-to-cart-beat-details-name {
          font-size: 1.8rem;
          font-variant: small-caps;
          font-weight: 600;
          margin-bottom: 1rem;
          color: map-get($grey, 'lighten-2');
        }
        div {
          color: map-get($grey, 'base');
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            display: inline-block;
            font-variant: small-caps;
            font-weight: 600;
            color: map-get($grey, 'lighten-2');
          }
          p {
            font-size: 1.4rem;
          }
        }
      }
      .licence-info {
        width: 100%;
        padding: 1rem;
        div {
          text-align: center;
          font-size: 1.6rem;
        }
        .licence-name {
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .description {
          color: map-get($grey, 'base');
          font-size: 1.4rem;
        }
      }
      .add-to-cart-licence {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row-reverse;
        padding: 1rem;
        .add-to-cart-licence-full, .add-to-cart-licence-shared {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: 3px;
          background-color: map-get($grey, 'darken-1');
          text-transform: uppercase;
          width: 47%;
          &:hover {
            background-color: map-get($grey, 'darken-2');
          }
        }
        .unavailable {
          cursor: not-allowed;
        }
        .activeButton {
          background-color: map-get($green, 'darken-2') !important;
        }
      }
      .error {
        width: 100%;
        text-align: center;
        margin-bottom: 1rem;
      }
      .add-to-cart-confirm-button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1rem;
        button {
          border: 1px solid transparent;
          border-radius: 3px;
          background-color: map-get($red, 'darken-3');
          color:  map-get($green, 'darken-2');
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.2rem 1rem;
          color: map-get($grey, 'lighten-2');
          font-size: 1.4rem;
          text-transform: uppercase;
          cursor: pointer;
          width: 47%;
          i {
            font-size: 1.4rem;
            margin-right: 0.5rem;
          }
          &:hover {
            background-color: map-get($red, 'darken-4');
          }
          &:disabled {
            background-color: map-get($grey, 'darken-1');
          }
        }
      }
    }
  }
</style>