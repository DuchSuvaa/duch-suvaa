<template>
  <nav class="grey darken-4 navi" :v-if="store.showQuantity">
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
          <div v-if="store.user">
            <CartQuantity />
          </div>
          </router-link>
        </li>
        <li v-if="!store.user"><router-link to="/auth">Login</router-link></li>
        <li v-else><router-link to="/account">Account</router-link></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <router-link to="/" class="brand-logo">
      <img src="../assets/logo.png" alt="">
    </router-link>
    <li class="sidenav-close"><router-link to="/">Home</router-link></li>
    <li class="sidenav-close"><router-link to="/sound">Sound</router-link></li>
    <li class="sidenav-close"><router-link to="/contact">Contact</router-link></li>
    <li class="cart-link sidenav-close">
      <router-link to="/cart">
      Cart
      <div v-if="store.user">
        <CartQuantity />
      </div>
      </router-link>
    </li>
    <li  class="sidenav-close" v-if="!store.user"><router-link to="/auth">Login</router-link></li>
    <li  class="sidenav-close" v-else><router-link to="/account">Account</router-link></li>
  </ul>
</template>

<script setup>
import CartQuantity from '../components/CartQuantity.vue'
import { useStore } from '../stores/store.js'

const store = useStore()
</script>

<style lang="scss">
  @import '../scss/_variables.scss';

  .router-link-active { color: map-get($red, 'darken-4') !important; }
  
  .sidenav-trigger {
  color: map-get($blue-grey, 'lighten-5');
  }

  .cart-link {
    a {
      position: relative;
      span {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:  map-get($red, 'darken-4');
        border: 1px solid map-get($grey, 'darken-4');
      }
    }
  }
  
  .nav-wrapper {
    .brand-logo {
      img {
        max-height: 64px !important;
        padding: 15px 0 !important;
        transform: scale(1.2);
      }
    }
    ul {
      li {
        a, span {
          font-family: monsters;
          text-shadow: $nav-text-shadow;
          color: map-get($shades, 'black');
          font-size: 1.8rem;
          letter-spacing: 0.1rem;
          padding: 0 15px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .cart-link {
        a {
          span {
            top: 16px;
            right: 4px;
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

  .sidenav {
    background-color:  map-get($grey, 'darken-4') !important;
    .brand-logo {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 2rem;
      margin-bottom: 4rem;
    }
    li {
      font-family: monsters;
      text-shadow: $nav-text-shadow;
      color: map-get($shades, 'black');
      text-align: center;
      a {
        font-size: 2rem !important;
        margin-bottom: 1rem;
      }
    }
    .router-link-active span { color: map-get($grey, 'darken-4') !important; }
    .cart-link {
      a {
        span {
          top: 14px;
          right: 10rem;
          border-radius: 50%;
          font-size: 1rem;
          width: 20px;
          height: 20px;
          padding: 0;
        }
      }
    }
  }
          
</style>