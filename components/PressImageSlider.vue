<template>
  <nuxt-link :to="$resizeImage(imageURL.link())" >
  <div class="press-image-slider">
      <div class="title">
        Bilder zum Downloaden
      </div>
    <div class="image-container">
      <div class="picture-container">
        <div
            v-for="s in imageGallery"
            :key="s._uid"
            class="picture"
            :style="{ 'background-image': 'url(' + $resizeImage(s.image, '300x300') + ')' }"
        />
        <div cass="download">
          Herunterladen
          <img class="download-cloud" src="~/assets/img/icons/download-icon.svg">
        </div>
      </div>
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
  .picture-container {
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 4vh;
    display: block;
    background-size: contain;
    background-position: center;
    display: flex;
    flex-flow: row;
  }
  .picture{
    height: 32vh;
    width: 23vw;
    overflow:hidden;
    background-repeat: no-repeat;
  }
  .download{
    display:flex;
    flex-flow:row;
    .download-cloud{
      height: 10vh;
      width: 3vw;
    }
  }
}

</style>
