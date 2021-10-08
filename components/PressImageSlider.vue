<template>
  <nuxt-link :to="$resizeImage(imageURL.link())" >
  <div class="press-image-slider">
      <div class="title">
        Bilder zum Downloaden
      </div>
    <div class="image-container">
      <img
          v-if="imageGallery"
          class="picture"
          :src="$resizeImage(imageGallery.image, '300x300')"
      >
    </div>
  </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['story'],
  computed: {
    imageGallery () {
      return this.story
    },
    imageURL () {
      return 'img2.storyblok.com' + this.story.image
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
.press-image-slider{
  margin-top: 5vh;
  background-color: black;
  color:white;
  padding: 50px;
  .title{
    display: flex;
    justify-content: center;
    font-size: 2em;
  }
  .image-container {
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4vh;
  }
}

</style>
