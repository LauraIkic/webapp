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
          <div class="download-underline" @click="myPath(s.image)">
<!--            <nuxt-link :to="s.image" class="download">-->
              <div class="download">
                <div class="download-text">
                  Herunterladen
                </div>
                <img class="download-cloud" src="~/assets/img/icons/download-icon.svg">
              </div>
<!--            </nuxt-link>-->
          </div>
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
  },
  methods: {
    myPath: function (to) {
      window.open(to)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/styles.scss';
.swiper-wrapper.center {
  @include media-breakpoint-up(sm) {
    justify-content: center;
  }
}
.download-underline{
  display: flex;
  height: 115%;
  color:white;
  .download{
    color:white;
    align-self: end;
    display: flex;
    flex-flow: row;
    height: 3vh;
    width: 400px;
    justify-content: center;
    .download-text{
      display: flex;
      align-self: center;
      font-size: 19px;
    }
    .download-cloud{
      height: 3vh;
      padding: 4px;
    }
  }
  &:hover {
    text-decoration: underline;
    .download-cloud{
      padding: 3px;
    }
  }
  @include media-breakpoint-down(md){
    height:125%;
  }
  @include media-breakpoint-down(sm) {
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
  @include media-breakpoint-down(md){
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
    @include media-breakpoint-down(sm) {
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
      @include media-breakpoint-down(md){
        width:200px !important;
        height: 180px !important;
      }
    }
    padding-bottom: 130px;
    @include media-breakpoint-down(md){
      height: 31vh;
    }
    @include media-breakpoint-down(sm){
      height: 40vh;
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
