<template>
  <footer>
    <div class="container">
      <div></div>
      <div class="privacy-policy">
        <router-link to="/privacy">Privacy Policy</router-link>
      </div>
    </div>    
  </footer>
  <div class="cookie-banner" v-if="showCookies" >
    <p>
      Strona używa cookies.
      <router-link to="/cookies">Polityka Cookies</router-link>
    </p>
    <div id="cookie-close" @click="hideCookies">No, super.</div>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';

const showCookies = ref(true)

if (localStorage.getItem("cookieSeen")) {
  showCookies.value = false
}

const hideCookies = () => {
  showCookies.value = false
  localStorage.setItem("cookieSeen", true)      
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  footer {
    margin-top: auto !important;
    background-color: map-get($grey, 'darken-3');
    color: map-get($grey, 'darken-4');
    padding: 1rem 0 1rem 0 !important;
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .privacy-policy {
        a {
          color: map-get($grey, 'darken-4');
        }
      }
    }
  }

  .cookie-banner {
    position: fixed;
    bottom: 0.5rem;
    left: 20%;
    right: 10%;
    width: 60%;
    padding: 1.5rem 1.5rem !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #242424 !important;
    border: 1px solid white;
    border-radius: 3px;
    font-size: 1.5rem;
  }

  #cookie-close {
    height: auto;
    background-color: white !important;
    color: map-get($grey, 'darken-4') !important;
    padding: 1rem;
    border-radius: 2px;
    cursor: pointer;
  }

</style>