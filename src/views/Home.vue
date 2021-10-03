<template>
  <div class="home-hero">
    <div class="home-hero-image container">
      <img src="@/assets/home-hero.png" modernize />
      <div class="hero-heading">
        <h1><span>B</span>eats from the <nobr><span>B</span>-Side</nobr></h1>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  },
  setup() {

  }
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .home-hero {
    background-image: url('../assets/home-hero-bg.png');
    background-size: cover;
    .home-hero-image {
      position: relative;
      picture {
        img {
          width: 100%;
        }
      }
      .hero-heading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        h1 {
          width: 100%;
          text-align: center;
          margin: 0;
          text-transform: uppercase;
          font-size: 3.2rem;
          padding: 0 2rem;
          font-weight: 800;
          text-shadow: $heading-text-shadow;
          color: map-get($grey, 'darken-4');
          span {
            display: inline-block;
            color: map-get($red, 'darken-4');
          }
        }
      }
    }

  }
</style>