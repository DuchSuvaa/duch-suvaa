<template>
  <div class="beat-preview">
    <div v-if="beat" class="row">
      <div class="no-padding-left beat-image">
        <img :src="beat.imageUrl" class="responsive-img">
      </div>
      <div class="beat-name">
        <h5>{{ beat.name }}
          <a :href="beat.previewUrl" target="_blank">
            <i class="material-icons">file_download</i>
          </a>
        </h5>
        <AudioPlayer />
      </div>
    </div>
    <div v-else class="row">
      <div class="no-padding-left beat-image">
        <img src="../assets/silence.png" class="responsive-img">
      </div>
      <div class="beat-details">
        <p>Please select a beat from the playlist.</p>
      </div>    
    </div>
  </div>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer.vue'

export default {
  props: [ 'beat' ],
  components: { AudioPlayer },
  setup() {

  }
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .no-padding-left {
    padding-left: 0 !important;
  }

  .beat-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .beat-name {
      h5 {
        align-items: center;
        justify-content: space-between;
        background-color: #272727;
        margin: 0;
        width: auto !important;
        display: flex;
        padding: 1.2rem;
        width: 100% !important;
        a {
          line-height: 1;
          margin-left: 0.4rem;
          transform: translateY(3px);
        }
      }
    }
  }

</style>