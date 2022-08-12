<template>
  <div
    v-editable="blok"
    class="image-slideshow"
  >
    <div
      v-if="blok.text"
      class="text"
    >
      {{ blok.text }}
    </div>
    <div v-swiper:swiper="swiperOption">
      <div
        class="swiper-wrapper"
        :class="{ center : length }"
      >
        <div
          v-for="s in blok.items"
          :key="s._uid"
          class="swiper-slide"
          :style="{ 'background-image': 'url(' + $resizeImage(s.image, '300x300') + ')' }"
        />
      </div>
      <div
        v-if="!length"
        class="swiper-button-next"
      />
      <div
        v-if="!length"
        class="swiper-button-prev"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  computed: {
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
        if (window.innerWidth < 600) {
          return 0
        }
      }
      return 30
    },
    num () {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 600) {
          return 1.5
        }
      }
      return 3
    },
    length () {
      return this.blok.items.length < 4
    }
  }
}
</script>

<style lang="scss">
.swiper-wrapper.center {
  @include media-breakpoint-up(sm) {
    justify-content: center;
  }
}

.image-slideshow {
  color: $color-blue;
  margin-top: 5rem;
  .text {
    @include margin-page-middle();
    padding: 2rem 0;
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
        height: 180px !important;
        margin-left: -20px;
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
    background-color: $color-yellow;
    background-size: 12px;
  }
}
</style>
