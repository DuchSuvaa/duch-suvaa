<template>
  <div class="container checkout">
    <h1>Checkout</h1>
    <div v-for="item in cartItems" :key="item.id">
      {{ item.name }}
    </div>
    <form @submit.prevent="handleSubmit" id="checkout-form">
      <div class="checkout-name input-field">
        <label for="name">name</label>
        <input type="text" id="name" v-model="name">
      </div>
      <div class="checkout-email input-field">
        <label for="email">e-mail</label>
        <input type="text" id="email" v-model="email">
      </div>
      <div class="checkout-address input-field">
        <label for="address">address</label>
        <input type="text" id="address" v-model="address">
      </div>
      <div class="checkout-city input-field">
        <label for="city">city</label>
        <input type="text" id="city" v-model="city">        
      </div>
      <div class="checkout-state input-field">
        <label for="state">state</label>
        <input type="text" id="state" v-model="state">
      </div>
      <div class="checkout-zip input-field">
        <label for="zip">zip code</label>
        <input type="text" id="zip" v-model="zip">
      </div>
      <div class="checkout-payment-methods">
        <div id="card-mount"></div>
      </div>
      <div class="checkout-buttons">
        <div class="waves-effect waves-light btn" @click="store.state.showCheckout = false">Return to Cart</div>
        <div class="waves-effect waves-light btn" @click="saveAddress">Save</div>
        <input class="waves-effect waves-light btn" type="reset" value="reset">
        <button class="waves-effect waves-light btn btn-send" :class="{ dis: loading }">
          {{ loading ? "Loading..." : "Pay $" + totalPrice }}
        </button>
      </div>
    </form>
    <div class="message" v-if="message">
      {{ message }}
    </div>
    <div class="error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import { loadStripe } from '@stripe/stripe-js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { firestore } from '@/firebase/config.js'

export default {
  props: [ 'totalPrice', 'cartItems' ],
  setup(props) {
    const store = useStore()
    let stripe = null
    let loading = ref(true)
    let elements = null
    const router = useRouter()
    const name = ref('')
    const email = ref('')
    const address = ref('')
    const city = ref('')
    const state = ref('')
    const zip = ref('')
    const message = ref('')
    const error = ref('')
    
    onMounted(async () => {
      stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)
      elements = stripe.elements()
      const element = elements.create('card', {
        style: {
          base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: '500',
            fontFamily: 'Open Sans, Roboto, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
              color: '#fce883',
            },
            '::placeholder': {
              color: '#87BBFD',
            },
          },
          invalid: {
            iconColor: '#FFC7EE',
            color: '#FFC7EE',
          },
        },
      })
      element.mount('#card-mount')
      loading.value = false
    })

    const saveAddress = () => {
      const addressFields = {
        name: name.value,
        email: email.value,
        address: address.value,
        city: city.value,
        state: state.value,
        zip: zip.value
      }
      firestore.collection('users').doc(store.state.user.uid).update({
        address: addressFields
      }).then( () => {
        message.value = 'Address saved.'
        setTimeout( () => {
          message.value = ''
        }, 10000)
      }).catch( (err) => {
        error.value = err
        setTimeout( () => {
          error.value = ''
        }, 10000)        
      })
    }

    async function handleSubmit() {
      if (loading.value) return
      loading.value = true

      const billingDetails = { 
        name: name.value, 
        email: email.value, 
        address: {
          city: city.value,
          line1: address.value,
          state: state.value,
          postal_code: zip.value
        }
      }

      const cardElement = elements.getElement('card')

      try {
        const response = await fetch("https://duch-suvaa-backend.herokuapp.com/stripe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount: props.totalPrice })
        })
        const { secret } = await response.json()
        const paymentMethodReq = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingDetails
        })
        const { error } = await stripe.confirmCardPayment(secret, {
          payment_method: paymentMethodReq.paymentMethod.id
        })
        if (error) return
        loading.value = false
        router.push('success')
      } catch (error) {
        console.log(error)
      }
    }
    return { store, loading, name, email, address, city, state, zip, message, error, saveAddress, handleSubmit }
  }


}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .checkout {
    #checkout-form {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      grid-gap: 2rem;
      > div:nth-of-type(odd) {
        grid-column: 1/7;
      }
      > div:nth-of-type(even) {
        grid-column: 7/13;        
      }
      .checkout-payment-methods, .checkout-buttons {
        grid-column: 1/13 !important;
      }
      .checkout-payment-methods {
        #card-mount {
          width: 30rem;
        }
      }
      .checkout-buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 2rem;
        button:not(:last-child), input, div {
          margin-right: 1rem;
        }
        .btn-send {
          background-color: map-get($red, 'darken-4');
        }
      }
      input {
        color: white;
      }
    }
  }

</style>