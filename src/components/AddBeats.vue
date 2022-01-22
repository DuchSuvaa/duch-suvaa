<template>
  <div class="add-beats">
    <h5>Add beats</h5>
    <form @submit.prevent="handleSubmit">
      <div class="input-field">
        <label for="name">Name</label>
        <input type="text" autocomplete required id="name" v-model="name">
      </div>
      <div class="input-field">
        <label for="bpm">BPM</label>
        <input type="text" autocomplete required id="bpm" v-model="bpm">
      </div>
      <div class="input-field">
        <label for="time">Time</label>
        <input type="text" autocomplete required id="time" v-model="time">
      </div>
      <div class="input-field">
        <label for="price">Price</label>
        <input type="text" autocomplete required id="price" v-model="price">
      </div>
      <div class="fileslist" v-if="audioName || imageName">
        <div v-if="audioName">{{ audioName }}</div>
        <div v-if="imageName">{{ imageName }}</div>
      </div>
      <div class="add-beat-form-buttons">
        <input type="file" accept="audio/mp3, audio/wav" @change="handleAudioChange" id="audio-file-upload" style="display:none;">
        <button class="btn" @click.prevent="addAudio()" id="audio-file-upload-button">Select Beat</button>
        <input type="file" accept="image/jpeg, image/png" @change="handleImageChange" id="image-file-upload" style="display:none;">
        <button class="btn" id="image-file-upload-button" @click.prevent="addImage">Select Image</button>
        <button class="btn">Add</button>
      </div>

    </form>
    <div v-if="audioError">
      {{ audioError }}
    </div>
    <div v-if="imageError">
      {{ imageError }}
    </div>
  </div>
</template>

<script>
import addBeat from '@/composables/addBeat.js'
import { ref } from '@vue/reactivity'
import useStorage from '@/composables/useStorage.js'
import { timestamp } from '../firebase/config'

export default {
  setup() {
    const { error, add } = addBeat()
    const name = ref('')
    const bpm = ref('')
    const time = ref('')
    const price = ref('')
    const audioFile = ref(null)
    const imageFile = ref(null)
    const audioName = ref(null)
    const imageName = ref(null)
    const audioFileError = ref(null)
    const imageFileError = ref(null)
    const temporaryAudioURL = ref('')
    const temporaryImageURL = ref('')
    const { audioError, imageError, audioUrl, imageUrl, audioFilePath, imageFilePath, 
    uploadAudio, uploadImage } = useStorage()

    const addAudio = () => { document.getElementById('audio-file-upload').click(); }
    const addImage = () => { document.getElementById('image-file-upload').click(); }

    const handleAudioChange = (e) => {
      const selectedAudio = e.target.files[0]
      audioName.value = e.target.files[0].name
      if (selectedAudio) {
        audioFile.value = selectedAudio
        temporaryAudioURL.value = URL.createObjectURL(selectedAudio)
        audioFileError.value = null
      } else {
        audioFile.value = null
        audioFileError.value = 'File cancelled.'
      }
    }

    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0]
      imageName.value = e.target.files[0].name
      if (selectedImage) {
        imageFile.value = selectedImage
        temporaryImageURL.value = URL.createObjectURL(selectedImage)
        imageFileError.value = null
      } else {
        imageFile.value = null
        imageFileError.value = 'File cancelled.'
      }
    }

    const handleSubmit = async () => {
      if (audioFile.value) {
        await uploadAudio(audioFile.value)
      }
      if (imageFile.value) {
        await uploadImage(imageFile.value)
      }
      const beat = {
        name: name.value,
        bpm: bpm.value,
        time: time.value,
        price: (price.value * 100),
        previewUrl: audioUrl.value,
        imageUrl: imageUrl.value,
        createdAt: timestamp(),
        status: 'available'
      }
      await add(beat)
      if (!error.value) {
        name.value = ''
        bpm.value = ''
        time.value = ''
        price.value = ''
        audioName.value = ''
        imageName.value = ''
      }
    }

    return { name, bpm, time, price, error, add, addAudio, addImage, handleAudioChange, handleImageChange, 
    audioName, imageName, handleSubmit, 
    audioFileError, imageFileError, audioError, imageError, audioUrl, imageUrl, audioFilePath, 
    imageFilePath, uploadAudio }
  }
}
</script>

<style lang="scss">
  .add-beats {
    width: 50%;
    form {
      .fileslist {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 2rem 0;
        > div {
          width: 100%;
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
      .add-beat-form-buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
        gap: 1rem;
      }
    }
  }
</style>