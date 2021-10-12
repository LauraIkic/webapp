<template>
  <div class="image-slideshow ">
    <div v-swiper:swiper="swiperOption">
      <div
          class="swiper-wrapper"
          :class="{ center : length }"
      >
        <div
            v-for="s in imageGallery"
            :key="s._uid"
            class="swiper-slide"
            :style="{ 'background-image': 'url(' + $resizeImage(s.image, '300x300') + ')' }"
            :aria-label="HI"
        />
        <div cass="download">
          Herunterladen
          <img class="download-cloud" src="~/assets/img/icons/download-icon.svg">
        </div>
      </div>
      <div
          class="swiper-button-next"
      />
      <div
          class="swiper-button-prev"
      />
    </div>
  </div>
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
    },
    swiperOption () {
      return {
        slidesPerView: this.num,
        spaceBetween: this.spaceBetween,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    },
    spaceBetween () {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 786) {
          return 0
        }
      }
      return 30
    },
    num () {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 786) {
          return 1
        }
      }
      return 3
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

.swiper-wrapper.center {
  @include media-breakpoint-up(sm) {
    justify-content: center;
  }
}

.image-slideshow {
  color: $color-blue;
  .text {
    @include margin-page-middle();
    padding: 5rem 0 4rem;
    font-size: 1.8rem;
    font-family: $font-secondary;
    line-height: 1.4;
    letter-spacing: 1.4px;
  }
  .swiper-container {
    height: 25em;
    .swiper-slide {
      display: block;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      @include media-breakpoint-down(md){
        width:200px !important;
        height: 180px !important;
      }
    }
    padding-bottom: 60px;
    @include media-breakpoint-down(md){
      height: 25vh;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    background-size: 12px;
  }
}
</style>
