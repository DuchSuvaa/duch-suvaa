<template>
  <div class="container cart-items">
    <div class="cart-item-list">
      <div v-for="item in cartItems" :key="item" class="cart-item">
        <div class="cart-item-col1">
          <img :src="item.imageUrl" class="image-small">
          <span class="cart-item-name"> {{ item.name }} </span>
          <span class="cart-item-licence"> {{ item.licence }} </span>
        </div>
        <div class="cart-item-col2">
          <span class="cart-item-price"> {{ "$" + (item.price * 0.01).toFixed(2) }} </span>
          <span class="cart-items-remove" @click="removeFromCart(item.id)">
            <i class="material-icons">close</i>
          </span>
        </div>
      </div>
    </div>
    <div class="cart-summary">
      <div class="total-price" v-if="cartItems">
        <span>Total: </span>
        <span>{{  "$" + (totalPrice * 0.01).toFixed(2) }}</span>
      </div>
      <div class="go-to-checkout">
        <a class="waves-effect waves-light btn" @click="handleClick">Checkout</a> 
      </div>
    </div>
  </div> 

</template>

<script>
import { useStore } from 'vuex'
import { firestore } from '@/firebase/config.js'
import { onBeforeMount } from '@vue/runtime-core'
import checkStatus from '@/composables/checkStatus.js'

export default {
  props: [ 'cartItems', 'totalPrice' ],
  setup(props) {
    const store = useStore()

    onBeforeMount( async () => {
      checkStatus(props.cartItems).then(resp => {
        resp.forEach( r => { if (r.data().licence === 'full') { removeFromCart(r.id) } })
      })
    })

    const handleClick = () => {
      checkStatus(props.cartItems).then(resp => {
        resp.forEach( r => { if (r.data().licence === 'full') { removeFromCart(r.id) } })
      })
      store.state.showCheckout = true;
    }

    const removeFromCart = (id) => {
      try {
        firestore.collection("users").doc(store.state.user.uid).update({
          cart: props.cartItems.filter( cartItem => cartItem.id != id )
        })
      } catch(error) {
        console.log(error)
      }
    }

    return { handleClick, removeFromCart }
  }

}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .cart-items {
    padding-top: 4rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    .cart-item-list {
      width: 66.6%;
      > div:not(:first-child) {
        margin-top: 1rem;
      }
      .cart-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: map-get($grey, 'darken-4');
        border: 1px solid transparent;
        border-radius: 3px;
        box-shadow: 0 0 8px rgba(255,255,255,.2);
        padding: 1rem;
        > div {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-direction: row;
          gap: 1rem;
        }
        .cart-item-col1 {
          color: inherit;
          .cart-item-licence {
            color: map-get($grey, 'darken-2');
          }
        }
        .cart-item-col2 {
          .cart-item-price {
            grid-column: 10/13;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
          .cart-items-remove {
            display: flex;
            align-items: center;
            i {
              cursor: pointer;
              color: map-get($grey, 'darken-2');
              font-size: 1.8rem;
              &:hover {
                color: white;
              }
            } 
          }
        }
      }
    }
    .cart-summary {
      width: 33.3%;
      box-shadow: 0 0 8px rgba(255,255,255,.2);   
      padding: 1rem;
      background-color: map-get($grey, 'darken-4');
      .total-price {
        width: 100%;
        display: flex;
        align-items: center;  
        justify-content: space-between;
      }
      .go-to-checkout {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 2rem;
        .btn {
          display: block;
          background-color: map-get($red, 'darken-4');
        }
      }
    }
  }
</style>