<template>
  <div
      class="image-slideshow"
  >
    <div v-swiper:swiper="swiperOption">
      <div
          class="swiper-wrapper"
          :class="{ center : length }"
      >
        <div
            v-for="s in items"
            :key="s"
            class="swiper-slide"
        >
          <nuxt-link :to="localePath('/de/press/' + s.slug)">
            <div class="press-post-preview">
              <div class="image" :style="{ 'background-image': 'url(' + s.content.Image + ')' }">
                <!--
                        <img :src="$resizeImage(story.content.Image, '300x200')">
                -->
              </div>
              <div class="press-information">
                <div class="title">
                  {{s.content.Title}}
                </div>
                <div class="date">
                  {{s.content.Date.slice(0,11)}}
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
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
  props: ['items'],
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
      return 10
    },
    num () {
      if (process.client && window && window.innerWidth) {
        if (window.innerWidth < 900 && window.innerWidth > 600) {
          return 2
        }
        if (window.innerWidth < 600) {
          return 1.1
        }
      }
      return 3
    },
    length () {
      return this.items.length < 4
    }
  }
}
</script>

<style lang="scss">
.swiper-slide{
  width: 300px !important;
  margin-left: 30px !important;
}
.swiper-wrapper.center {
  @include media-breakpoint-up(sm) {
    justify-content: center;
  }
}

.image-slideshow {
  color: $color-blue;
  margin-top: 2rem;
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
        height: 300px !important;
        margin-left: -20px;
      }
    }
    padding-bottom: 60px;
    @include media-breakpoint-down(md){
      height: 50vh;
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
