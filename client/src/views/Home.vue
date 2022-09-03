<template>
  <div class="home-hero">
    <div class="home-hero-image container">
      <img src="../assets/home-hero.png" modernize />
      <div class="hero-heading">
        <h1><span>B</span>eats from the <nobr><span>B</span>-Side</nobr></h1>
      </div>
    </div>
  </div>
  <div class="container home">
    <h3>If you are a trueschool MC...</h3>
    <p class="paragraph">This site contains beats sampled from old, dusty vinyl records - a source that gives a sound 
      that specific character, which you can only love or hate. If you are a fan of sharp and sterile trap sounds 
      and crazy hi-hats,  then this might not be a good place for you...
    </p>
    <p class="paragraph">I got a creative approach towards beatmaking - you won't find here just loops layered with drums 
      neither beats made using stock samples. I'm crate digging for unique sounds to give them a new life.
    </p>
    <div class="home-links">
      <router-link to="/sound" class="btn">Explore Beats</router-link>
    </div>
    <h3>How does it work?</h3>
    <p class="paragraph">If you chose a beat for yourself, then you have to decide on the licence type.
      A separate window will pop up for you to pick one. There are two types of licences available:
    </p>
    <p class="paragraph"><strong>Full licence</strong> means that you get the beat for yourself, including all tracks rendered to .wav files, so that
      you can arrange it as you wish.
    </p>
    <p class="paragraph"><strong>Shared licence</strong> is when you choose to record to a specific beat, but you
    don't care if others could also use it. If you select this licence, I will send you the beat already arranged with
    length as specified in the table.
    </p>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
  @import '../scss/_variables.scss';

  .home-hero {
    .home-hero-image {
      position: relative;
      picture {
        overflow: hidden;
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
          padding: 0 2rem;
          text-shadow: $heading-text-shadow;
          color: map-get($grey, 'darken-4');
          font-family: monsters;
          margin: 0;
          @media (max-width: 600px) {
            font-size: min(7vw, 4.2rem)
          }
          span {
            display: inline-block;
            color: map-get($red, 'darken-4');
          }
        }
      }
    }
  }

  .home {
    width: 50% !important;
    text-align: center;
    margin: 4rem auto !important;
    .paragraph {
      margin-bottom: 1rem;
      strong {
        font-weight: 800;
      }
    }
    .home-links {
      a {
        margin: 2rem auto 4rem;
        background-color: map-get($red, 'darken-3');
        &:hover {
          background-color: map-get($red, 'darken-4');          
        }
      }
    }
  }
</style>