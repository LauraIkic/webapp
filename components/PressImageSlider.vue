<template>
    <div class="image-slideshow ">
      <div v-swiper:swiper="swiperOption">
        <div
            class="swiper-wrapper">
          <div
              v-for="s in imageGallery"
              :key="s._uid"
              class="swiper-slide"
              :style="{ backgroundImage: 'url(' + $resizeImage(s.image, '300x300') + ')'}">
            <div class="slide-image-title">
            </div>
            <div class="download-underline" >
              <div class="download">
                <div class="download-text">
                  {{s.text}}
                </div>
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
        spaceBetween: 0,
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
      return 0
    },
    num () {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 786) {
          return 1.2
        }
      }
      return 2.7
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
.swiper-slide{
  margin-left: 40px !important;
  margin-right: 40px !important;
  @include media-breakpoint-down(md) {
    margin-left: 30px !important;
    margin-right: 0px !important;
  }
}
.slide-image-title{
  display: flex;
  flex-flow: column;
  height: inherit;
  align-content: initial;
  justify-content: flex-end;
  transition: 0.5s cubic-bezier(0.755, 0.05, 0.855, 0.06);
  width: inherit;
  @include media-breakpoint-down(md) {
    margin-top: 119%;
    transition: none;
    height: 0;
  }
}
.image-title {
  transition: 0.5s cubic-bezier(.02,-0.15,.74,.05);
  transform: translate(18%, -15%);
  opacity: 0;
  color: white;
  display: flex;
  flex-flow: column;
  margin-top: -230px;
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
    margin-top: 3%;
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
      font-size: 1.2em;
    }
    padding-top: 30px;
    height: 25em;
    padding-bottom: 100px;
    width: 90%;
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
    }

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
