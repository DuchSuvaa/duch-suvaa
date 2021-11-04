<template>
  <div class="container checkout">
    <div class="return" @click="store.state.showCheckout = false">
      <i class="material-icons">arrow_back</i>
      &nbsp;Return to Cart
    </div>
    <div v-for="item in cartItems" :key="item.id">
      {{ item.name }}
    </div>
    <BillingDetails />
    <div class="checkout-payment-methods">
      <div id="card-mount"></div>
    </div>
    <div class="checkout-buttons">
      <button class="waves-effect waves-light btn btn-send" :class="{ dis: loading }" @click="handleSubmit">
        {{ loading ? "Loading..." : "Pay $" + (totalPrice * 0.01).toFixed(2) }}
      </button>
    </div>
    <div class="message" v-if="message">
      {{ message }}
    </div>
    <div class="error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import BillingDetails from '@/components/BillingDetails.vue'
import { onMounted, ref } from '@vue/runtime-core'
import { loadStripe } from '@stripe/stripe-js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  props: [ 'totalPrice', 'cartItems' ],
  components: { BillingDetails },
  setup(props) {
    const store = useStore()
    let stripe = null
    let loading = ref(true)
    let elements = null
    const router = useRouter()
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

    async function handleSubmit() {
      if (loading.value) return
      loading.value = true

      const billingDetails = { 
        name: store.state.billingDetails.name, 
        email: store.state.billingDetails.email, 
        address: {
          city: store.state.billingDetails.city,
          line1: store.state.billingDetails.address,
          state: store.state.billingDetails.state,
          postal_code: store.state.billingDetails.zip
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
    return { store, loading, message, error, handleSubmit }
  }
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .checkout {
    padding-top: 2rem;
    .return {
      margin-bottom: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      i {
        font-size: 1.2rem;
      }
    }
    #checkout-form {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      grid-gap: 2rem;
      margin-top: 1rem;
      > div:nth-of-type(odd) {
        grid-column: 1/7;
      }
      > div:nth-of-type(even) {
        grid-column: 7/13;        
      }
      .checkout-payment-methods, .checkout-buttons {
        grid-column: 1/13 !important;
      }
      input {
        color: white;
      }
    }
    .checkout-payment-methods {
      margin-top: 2rem;
      margin-bottom: 2rem;
      #card-mount {
        width: 30rem;
      }
    }
  }

  .checkout-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button:not(:last-child), input:not(:last-child), div:not(:last-child) {
      margin-right: 1rem;
    }
    .btn-send {
      background-color: map-get($red, 'darken-4');
    }
  }

</style>