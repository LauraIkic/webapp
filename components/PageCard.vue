<template>
  <div
      v-editable="blok"
      class="page-card"
  >
    <nuxt-link :to="'/' + blok.link.cached_url">
      <section
          class="display-item"
          :class="{length : length}"
      >
        <div class="top">
          <div class="top-image" :style="{ 'background-image': 'url(' + $resizeImage(blok.image, '1500x1500') + ')' }"/>
        </div>
        <div class="bottom">
          <div class="bottom-text">
            {{blok.text}}
          </div>
        </div>
      </section>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'PageCard',
  props: ['blok'],
  computed: {
    length () {
      return this.blok.length > 1
    }
  }
}
</script>

<style lang="scss" scoped>
.display-item {
  .length {
    width: 250px;
  }
  border-radius: 15px;
  height: 230px;
  display: flex;
  background: white;
  width: 370px;
  box-shadow: 10px 5px 5px #00000024;
  flex-flow: column;
  overflow: hidden;
  @include media-breakpoint-down(md) {
    height: 200px;
    width: 300px;
    margin: 5% 0;
  }

  .top {
    .top-image {
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      height: 175px;
      width: 370px;
      transition: transform 0.4s ease;
      transform-origin: 50% 50%;
      @include media-breakpoint-down(md) {
        height: 155px;
      }
    }
  }
  .bottom {
    height: 45%;
    align-self: end;
    width: inherit;
    border-bottom-right-radius: 13px;
    border-bottom-left-radius: 13px;

    .bottom-text {
      text-align: center;
      margin: 3% 0;
      color: black;
    }
  }
  &:hover {
    .top-image {
      transform: scale(1.02);
      width: 100%;
    }
  }
}
</style>
