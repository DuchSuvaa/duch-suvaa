<template>
  <div>Beat Preview</div>
  <div v-if="beat">
    <div>
      <img :src="beat.imageUrl" alt="">
    </div>
    <div>{{ beat.name }}</div>
    <div>{{ beat.bpm }}</div>
    <div>{{ beat.time }}</div>
    <div>{{ beat.time }}</div>
    <div>
      <a :href="beat.previewUrl" target="_blank">
        <i class="material-icons">file_download</i>
      </a>
    </div>
  </div>
  <div v-else>no beat</div>
</template>

<script>
export default {
  props: [ 'beat' ],
  setup() {

  }
}
</script>

<style lang="scss">

</style>