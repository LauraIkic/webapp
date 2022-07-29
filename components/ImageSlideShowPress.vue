<template>
  <div class="image-slideshow ">
    <div v-swiper:swiper="swiperOption">
      <div
          class="swiper-wrapper"
      >
        <div
            v-for="s in pressComponents"
            :key="s._uid"
            class="swiper-slide">
          <img :src="$resizeImage(s.content.Image, '300x300') ">
          <div class="slide-image-title">
            <div class="image-title">
              <p>
                {{s.content.Title}}
              </p>
            </div>
            <div class="image-title">
              <p>
                13-7-2022
              </p>
            </div>
          </div>
          <div class="download-underline" @click="myPath(s.image)">
            <div class="download">
              <div class="download-text">
              </div>
<!--              <img class="download-cloud" src="~/assets/img/icons/download-icon.svg">-->
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
  props: ['pressComponents'],
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

.slide-image-title{
  display: flex;
  flex-flow: column;
  height: inherit;
  align-content: initial;
  justify-content: flex-end;
  transition: 0.5s cubic-bezier(0.755, 0.05, 0.855, 0.06);
  width: inherit;
  @include media-breakpoint-down(md) {
    transition: none;
    height: 0;
  }
}
.image-title {
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
  img{
    opacity: 0.3;
    width: inherit;
  }
  .title{
    font-family: Chakra Petch;
    font-size: 2.5rem;
    color: black;
    display: flex;
    justify-content: center;
    margin-bottom: 2%;
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
    padding-top: 10px;
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
      .slide-image-title{
        position: relative;
        left: 0;
        width: 80%;
        margin-left: 10px;
        height: fit-content;
        display: flex;
        justify-content: flex-end;
        @include media-breakpoint-down(md){
          transition: none;
        }
      }
      .image-title{
        @include media-breakpoint-up(md){
          font-size: 1.3rem;
          opacity:1;
          color: black;
        }
      }
    }
    padding-bottom: 100px;
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
.image-slideshow:after{
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.4;
}
</style>

<!--
<template>
  <div class="image-slideshow">
&lt;!&ndash;    <div
        v-if="blok.text"
        class="text">
      {{ blok.text }}
    </div>&ndash;&gt;
    <div v-swiper:swiper="swiperOption">
      <div
          class="swiper-wrapper"
          :class="{ center : length }"
      >
        <div
            v-for="p in pressComponents"
            :key="p._uid"
            class="swiper-slide"
            :style="{ 'background-image': 'url(' + $resizeImage(p.content.Image, '300x300') + ')' }"
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
  props: ['pressComponents'],
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
      return this.pressComponents.length < 4
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
-->
