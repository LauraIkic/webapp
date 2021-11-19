<template>
    <div class="image-slideshow ">
      <div v-swiper:swiper="swiperOption">
        <div class="title">
          {{ $t('pressImages') }}
        </div>
        <div
            class="swiper-wrapper"
        >
          <div
              v-for="s in imageGallery"
              :key="s._uid"
              class="swiper-slide"
              :style="{ backgroundImage: 'url(' + $resizeImage(s.image, '300x300') + ')'}">
            <div class="slide-image-title">
              <div class="image-title">
                {{s.text}}
              </div>
            </div>
            <div class="download-underline" @click="myPath(s.image)">
              <div class="download">
                <div class="download-text">
                  {{ $t('download') }}
                </div>
                <img class="download-cloud" src="~/assets/img/icons/download-icon.svg">
              </div>
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
.slide-image-title{
  display: flex;
  flex-flow: column;
  height: 150px;
  align-content: initial;
  justify-content: end;
  margin-top:40%;
  transition: 0.5s cubic-bezier(0.755, 0.05, 0.855, 0.06);
  width: inherit;
  @include media-breakpoint-down(md) {
    margin-top: 119%;
    transition: none;
    height: 0px;
  }
}
.image-title {
  transition: 0.5s cubic-bezier(.02,-0.15,.74,.05);
  transform: translate(18%, -200%);
  opacity: 0;
  color: white;
  display: flex;
  flex-flow: column;

  @include media-breakpoint-down(md) {
    opacity: 1;
    position: fixed;
    transform: none;
    width: inherit;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 4%;
    transition: none;
    font-size: 16px;
  }
}

.download-underline {
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
  @include media-breakpoint-down(md) {
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
    @include media-breakpoint-down(md) {
      font-size: 1.8rem;
      margin-bottom: 2%;
      @include media-breakpoint-down(sm) {
        margin-bottom: 4%;
      }
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
      transition: 0.5s cubic-bezier(0.755, 0.05, 0.855, 0.06);
      @include media-breakpoint-down(md){
        width:200px !important;
        height: 180px !important;
      }
      &:hover{
        .slide-image-title{
          background-color: rgba(19, 17, 19, 0.41);
          position: relative;
          left: 0;
          transition-duration: .4s, .5s;
          transition-timing-function: ease, ease-out;
          transition-delay: 0s, .4s;
          box-shadow: 0px -40px 71px rgba(0, 0, 0, 0.44);
          transition-property: all;
          @include media-breakpoint-down(md){
            transition: none;
          }
        }
        .image-title{
          @include media-breakpoint-up(md){
            font-size: 1.5rem;
            opacity:1;
          }
        }
      }
    }
    padding-bottom: 130px;
    @include media-breakpoint-down(md){
      height: 360px;
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
