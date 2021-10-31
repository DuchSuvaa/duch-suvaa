<template>
  <div class="container cart-items">
    <h1>Cart</h1>
    <div v-for="item in cartItems" :key="item" class="cart-item">
      <span class="cart-items-remove" @click="removeFromCart(item)">
        <i class="material-icons">close</i>
      </span>
      <img :src="item.imageUrl" class="image-small">
      <span class="cart-item-name"> {{ item.name }} </span>
      <span class="cart-item-price"> {{ "$" + (item.price * 0.01).toFixed(2) }} </span>
    </div>
    <div class="total-price" v-if="cartItems">
      <span>Total Price: </span>
      <span>{{  "$" + (totalPrice * 0.01).toFixed(2) }}</span>
    </div>
    <div class="go-to-checkout">
      <a class="waves-effect waves-light btn" @click="handleClick">Go to Checkout</a> 
    </div>
  </div> 

</template>

<script>
import { useStore } from 'vuex'
import firebase from 'firebase/app'
import { firestore } from '@/firebase/config.js'
import getUser from '@/composables/getUser.js'

export default {
  props: [ 'cartItems', 'totalPrice' ],
  setup() {
    const store = useStore()
    const { user } = getUser()

    const handleClick = () => {
      store.state.showCheckout = true;
    }

    const removeFromCart = (item) => {
      try {
        firestore.collection("users").doc(user.value.uid).update({
          cart: firebase.firestore.FieldValue.arrayRemove( item )
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
    .cart-item {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      padding: 1rem;
      border: 1px solid map-get($grey, 'darken-3');
      .cart-items-remove {
        grid-column: 1/2;
        display: flex;
        align-items: center;
        i {
          cursor: pointer;
        } 
      }
      .image-small {
        grid-column: 2/4;
      }
      .cart-item-name {
        grid-column: 4/10;
        display: flex;
        align-items: center;
      }
      .cart-item-price {
        grid-column: 10/13;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    .total-price {
      width: 100%;
      display: flex;
      align-items: center;  
      justify-content: space-between;   
      padding: 1rem;
    }
    .go-to-checkout {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 2rem;
      .btn {
        background-color: map-get($red, 'darken-4');
      }
    }
  }
</style>