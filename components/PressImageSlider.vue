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
            :style="{ backgroundImage: 'url(' + $resizeImage(s.image, '300x300') + ')'}"
        />
      </div>
      <div  class="swiper-wrapper"
            :class="{ center : length }">
          <div
              v-for="s in imageGallery"
              :key="s._uid"
              class="swiper-slide"
              :text="'Herunterladen'"
              :style="{backgroundImage: 'url('+require('assets/img/icons/download-icon.svg' )+')'}"
          />
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
.swiper-wrapper.center {
  @include media-breakpoint-up(sm) {
    justify-content: center;
  }
}

.image-slideshow {
  .swiper-slide-download{
    display: block;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height:3vh;
    width:300px;
    @include media-breakpoint-down(md){
      width:200px !important;
      height: 180px !important;
    }
  }
  .swiper-container {
    padding-top: 30px;
    .download{
      .swiper-slide {
        display: block;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        height:3vh;
        @include media-breakpoint-down(md){
          width:200px !important;
          height: 180px !important;
        }
      }
    }
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
