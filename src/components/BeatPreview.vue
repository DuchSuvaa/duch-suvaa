<template>
  <div class="beat-preview">
    <div v-if="store.state.currentBeat" class="row">
      <div class="no-padding-left beat-image">
        <img :src="store.state.currentBeat.imageUrl" class="responsive-img">
      </div>
      <div class="beat-name">
        <h5>{{ store.state.currentBeat.name }}
          <a :href="store.state.currentBeat.previewUrl" target="_blank">
            <i class="material-icons">file_download</i>
          </a>
        </h5>
        <AudioPlayer :showVolumeControl="true" />
      </div>
    </div>
    <div v-else class="row">
      <div class="no-padding-left beat-image">
        <img src="../assets/silence.png" class="responsive-img">
      </div>
      <div class="beat-name">
        <h5>Select a beat.</h5>  
      </div>   
    </div>
  </div>
</template>

<script setup>
import AudioPlayer from '../components/AudioPlayer.vue'
import { useStore } from 'vuex'

const store = useStore()

</script>

<style lang="scss">
  @import '../scss/_variables.scss';

  .no-padding-left {
    padding-left: 0 !important;
  }

  .beat-preview {
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
  @media (max-width: 700px) {
    .beat-preview {
      .beat-image {
        width: 25%;
        min-width: 83px;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .beat-name {
          width: 75%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          h5 {
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
        }
      }
    }
  }

</style>