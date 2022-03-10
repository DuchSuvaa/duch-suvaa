<template>
  <div class="sound-header">
    <div class="sound-header-image container">
      <img src="@/assets/sound-header.png" modernize />
      <div class="sound-heading">
        <h1>Sound</h1>
      </div>
    </div>
  </div>
  <div class="container sound">
    <BeatPreview />
    <Playlist />
  </div>
</template>

<script>
import BeatPreview from '@/components/BeatPreview.vue'
import Playlist from '@/components/Playlist.vue'

export default ({
  components: { BeatPreview, Playlist },
  setup() {
    
  }
})
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .sound-header {
    background-image: url('../assets/sound-header-bg.png');
    background-size: cover;
    margin-bottom: 2rem;
    .sound-header-image {
      position: relative;
      picture {
        img {
          width: 100%;
        }
      }
      .sound-heading {
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
          span {
            display: inline-block;
            color: map-get($red, 'darken-4');
          }
        }
      }
    }
  }

  .sound {
    margin-top: 1.4rem !important;
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    .beat-preview {
      grid-column: 1/4;
      @media (max-width: 700px) { grid-column: 1/13; }

    }
    .beats-playlist {
      grid-column: 4/13;
      @media (max-width: 700px) { grid-column: 1/13; }

    }
  }

</style>