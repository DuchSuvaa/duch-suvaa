<template>
  <div v-if="beat" class="row">
    <div class="col s3 no-padding-left">
      <img :src="beat.imageUrl" class="responsive-img">
    </div>
    <div class="col s9 beat-details">
      <h5>{{ beat.name }}
        <a :href="beat.previewUrl" target="_blank">
          <i class="material-icons">file_download</i>
        </a>
      </h5>
      <div class="beat-details">
        <div>Tempo: {{ beat.bpm }} BPM, Time: {{ beat.time }}, Price: {{ beat.price }}</div>
      </div>
    </div>
  </div>
  <div v-else class="row">
    <div class="col s3 no-padding-left">
      <img src="../assets/silence.png" class="responsive-img">
    </div>
    <div class="col s9 beat-details">
      <h4>Choose a Beat</h4>
    </div>    
  </div>
</template>

<script>
export default {
  props: [ 'beat' ],
  setup() {

  }
}
</script>

<style lang="scss">
  @import '@/scss/_variables.scss';

  .no-padding-left {
    padding-left: 0 !important;
  }

  .beat-details {
    h5 {
      width: auto !important;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      a {
        line-height: 1;
        margin-left: 0.4rem;
        transform: translateY(3px);
      }
    }
  }

</style>