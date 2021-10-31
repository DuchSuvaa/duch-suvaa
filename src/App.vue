<template>
  <Header />
  <router-view/>
  <Footer />
</template>

<script>
import M from 'materialize-css'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default ({
  components: { Header, Footer },
  mounted () {
    M.AutoInit()
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
}

div, p {
  font-size: 16px;
}

span {
  font-size: inherit;
}

html {
  background-color: map-get($grey, 'darken-4');
}

body, html, div, p, span, a, table, tr, td, th, form, ul, li, img, picture, header, main, footer, input {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: block;
}

</style>
