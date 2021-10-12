<template>
  <div class="image-slideshow ">
    <div v-swiper:swiper="swiperOption">
      <div class="title">
      PRESSEBILDER
    </div>
      <div
          class="swiper-wrapper"
          :class="{ center : length }"
      >
        <div
            v-for="s in imageGallery"
            :key="s._uid"
            class="swiper-slide"
            :style="{ backgroundImage: 'url(' + $resizeImage(s.image, '300x300') + ')'}">
          <div class="download-underline">
            <nuxt-link :to="s.image" class="download">
              <div class="download">
                Herunterladen
                <img class="download-cloud" src="~/assets/img/icons/download-icon.svg">
              </div>
            </nuxt-link>
          </div>
       </div>
      </div>
<!--      <div  class="swiper-wrapper"
            :class="{ center : length }">
          <div class="swiper-slide"
              v-for="s in imageGallery"
              :key="s._uid"
              v-bind:class="swiper-slide-download"
              :style="{backgroundImage: 'url('+require('assets/img/icons/download-icon.svg' )+')'}">
            <div v-bind:class="swiper-slide" class="download-text">
              <a :href="s.image"></a>
              Herunterladen
            </div>
          </div>
        </div>-->
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
    image () {
      return 'assets/img/icons/download-icon.svg'
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

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.swiper-wrapper.center {
  @include media-breakpoint-up(xs) {
    justify-content: center;
  }
}
.download-underline{
  display: flex;
  height: 38vh;
  color:white;
  .download{
    color:white;
    align-self: end;
    display: flex;
    flex-flow: row;
    height: 3vh;
    width: 400px;
    justify-content: center;
    .download-cloud{
      height: 2.5vh;
      padding: 4px;
    }
  }
  &:hover {
    text-decoration: underline;
    .download-cloud{
      padding: 3px;
    }
  }
  @include media-breakpoint-down(xs) {
    height:26vh;
    .download{
      width:211px;
    }
  }
}
.swiper-slide-download{
  width:300px;
  height:3vh;
  display: block;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 401.333px;
  margin-left:10%;
  @include media-breakpoint-down(sm){
    width:200px !important;
    height: 180px !important;
  }
}
.image-slideshow {
  .title{
    font-family: Chakra Petch;
    font-size: 2.5rem;
    color: white;
    display: flex;
    justify-content: center;
    margin-bottom: 2%;
    text-transform: capitalize;
    @include media-breakpoint-down(xs) {
      font-size: 1.8rem;
      margin-bottom: 4%;
    }
  }
  .swiper-container {
    .download-text{
      color:white;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
    padding-top: 30px;
    height: 25em;
    .swiper-slide {
      display: block;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      @include media-breakpoint-down(sm){
        width:200px !important;
        height: 180px !important;
      }
    }
    padding-bottom: 130px;
    @include media-breakpoint-down(sm){
      height: 25vh;
    }
    @include media-breakpoint-down(xs){
      height: 36vh;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $color-yellow;
    background-size: 12px;
  }
}
</style>
