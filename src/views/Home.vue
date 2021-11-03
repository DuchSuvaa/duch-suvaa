<template>
  <div class="home-hero">
    <div class="home-hero-image container">
      <img src="@/assets/home-hero.png" modernize />
      <div class="hero-heading">
        <h1><span>B</span>eats from the <nobr><span>B</span>-Side</nobr></h1>
      </div>
    </div>
  </div>
  <div class="container home">
    <h4>If you are a trueschool MC...</h4>
    <p>This site contains beats sampled from old, dusty vinyl records – a source that gives a sound that specific character, which you can only love or hate. If you are a fan of sharp and sterile trap sounds and hi-hats sounding like winding up a watch, then this might not be a good place for you... I got a creative approach towards beatmaking - you won't find here just loops layered with drums neither beats made using stock samples. I'm crate digging for sounds to give them a new life.</p>
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
          font-family: monsters;
          span {
            display: inline-block;
            color: map-get($red, 'darken-4');
          }
        }
      }
    }

  }
</style>