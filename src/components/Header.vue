<template>
  <nav class="grey darken-4" :v-if="store.state.showQuantity">
    <div class="nav-wrapper container">
      <router-link to="/" class="brand-logo">
        <img src="../assets/logo.png" alt="">
      </router-link>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/sound">Sound</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li class="cart-link">
          <router-link to="/cart">
          Cart
          <div v-if="user">
            <CartQuantity />
          </div>
          </router-link>
        </li>
        <li v-if="!user"><router-link to="/auth">Login</router-link></li>
        <li v-else><router-link to="/account">Account</router-link></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/sound">Sound</router-link></li>
    <li><router-link to="/contact">Contact</router-link></li>
    <li><router-link to="/cart">Cart</router-link></li>
    <li v-if="!user"><router-link to="/auth">Login</router-link></li>
    <li v-else><router-link to="/account">Account</router-link></li>
  </ul>
</template>

<script>
import CartQuantity from '@/components/CartQuantity.vue'
import getUser from '@/composables/getUser.js'
import { useStore } from 'vuex'

export default {
  components: { CartQuantity },
  setup() {
    const store = useStore()
    const { user } = getUser()

    return { user, store }
  }
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .nav-wrapper {
    ul {
      li {
        a, span {
          font-family: monsters;
          text-shadow: $nav-text-shadow;
          color: map-get($shades, 'black');
          font-size: 1.2rem;
          letter-spacing: 0.1rem;
          padding: 0 15px;
          &:hover {
            color: map-get($grey, 'darken-4');
            cursor: pointer;
          }
          &.router-link-active {
            color: map-get($red, 'darken-4');
          }
        }
      }
      .cart-link {
        a {
          position: relative;
          span {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 16px;
            right: 4px;
            background-color:  map-get($red, 'darken-4');
            border: 1px solid map-get($grey, 'darken-4');
            border-radius: 50%;
            font-size: 0.6rem;
            width: 16px;
            height: 16px;
            padding: 0;
          }
        }
      }
    }
  }

  nav {
  .nav-wrapper {
    .brand-logo {
      img {
        max-height: 64px !important;
        padding: 15px 0 !important;
        transform: scale(1.2);
      }
    }
  }
}
</style>