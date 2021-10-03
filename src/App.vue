<template>
  <Header />
  <router-view/>
</template>

<script>
import M from 'materialize-css'
import Header from '@/components/Header.vue'

export default ({
  components: { Header },
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
  font-size: 10px;
  color: map-get($blue-grey, 'lighten-5');
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
  ul {
    li {
      a {
        font-family: monsters;
        color: map-get($grey, 'darken-4');
        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }
  }

}

</style>
