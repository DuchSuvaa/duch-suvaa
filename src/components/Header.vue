<template>
  <nav class="grey darken-4">
    <div class="nav-wrapper container">
      <a href="#!" class="brand-logo">
        <img src="../assets/logo.png" alt="">
      </a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/sound">Sound</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/sound">Sound</router-link></li>
    <li><router-link to="/contact">Contact</router-link></li>
  </ul>
</template>

<script>


export default {

}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .nav-wrapper {
    ul {
      li {
        a {
          text-shadow: $nav-text-shadow;
          color: map-get($shades, 'black');
          font-size: 1.2rem;
          letter-spacing: 0.1rem;
          &:hover {
            color: map-get($grey, 'darken-4');
          }
          &.router-link-active {
            color: map-get($red, 'darken-4');
          }
        }
      }
    }
  }
</style>