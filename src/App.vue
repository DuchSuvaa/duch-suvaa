<template>
  <Header />
  <router-view/>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import M from 'materialize-css'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { projectAuth } from '@/firebase/config.js'

export default ({
  components: { Header, Footer },
  setup() {
    onMounted( async () => {
      const store = useStore()
      await store.commit('getUser')
      projectAuth.onAuthStateChanged(_user => {
        store.state.user = _user
      })
      M.AutoInit()
    })
  }
})
</script>


<style lang="scss">
@import './scss/_variables.scss';

@font-face {
  font-family: 'monsters';
  src: url('./assets/monsters-attack.ttf');
}

@font-face {
  font-family: 'open-sans';
  src: url('./assets/open-sans.ttf');
}

#app {
  font-family: open-sans, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: map-get($blue-grey, 'lighten-5');
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-image: url('./assets/pexels-bg.png');
  background-attachment: fixed;
}

html {
  font-size: 10px !important;
}

div, p {
  font-size: 1.8rem;
}

h1 {
  font-size: 4.8rem;
  text-transform: uppercase;
  font-weight: 800;
}

h3 {
  font-size: 3rem;
  font-weight: 700 !important;
  margin-bottom: 3rem !important;
}

span {
  font-size: inherit;
}

html {
  background-color: map-get($grey, 'darken-4');
}

form, input {
  color: map-get($blue-grey, 'lighten-5');
}

form {
  display: flex;
  background-color: map-get($grey, 'darken-4');
  label {
    font-size: 1.2rem !important;
  }
  input {
    margin-top: 3rem !important;
    height: 4rem !important;
  }
  input[type="reset"] {
    margin-top: 0 !important; 
    height: 36px !important;
  }
  button {
    margin-top: 2rem;
  }
}

body, html, div, p, span, a, table, tr, td, th, form, ul, li, img, picture, header, main, footer, input {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: block;
}

.account, .auth, .cart, .contact, .cookies, .home, .privacy, .sound, .success {
  padding-bottom: 4rem;
}

.message {
  margin-top: 1rem;
  color: map-get($green, 'lighten-2')
}

.error {
  margin-top: 1rem;
  color: map-get($red, 'darken-2')
}

</style>
