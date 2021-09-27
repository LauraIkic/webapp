<template>
  <div class="container">
    <div v-editable="blok"
         class="press-images">
      <div class="title">
        <h2>
          Bilder zum Downloaden
        </h2></div>
    </div>
    <div class="image-container" v-if="blok.images">
      IMAGES
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  name: 'PressImageSlider'
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
.container{
  height: 30vh;
  background-color: black;
}
.press-images {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  .title {
    color: white;
  }
}

.image-container {
  background-color: #72A4B2 !important;
  color: white;
  max-width: 70%;
  margin-left: auto;
  margin-right: auto;
  height: 20vh;
}
</style>
