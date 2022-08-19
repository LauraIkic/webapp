<template>
  <div
      v-editable="blok"
      class="page-card"
  >
    <nuxt-link :to="'/' + blok.link.cached_url">
      <section class="display-item">
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
  props: ['blok']
}
</script>

<style lang="scss" scoped>
.display-item {
  border-radius: 15px;
  height: 230px;
  display: flex;
  background: black;
  width: 370px;
  box-shadow: 10px 5px 5px #00000024;
  flex-flow: column;
  @include media-breakpoint-down(md) {
    height: 200px;
    width: 300px;
    margin: 5% 0;
  }

  .top {
    height: inherit;
    color: white;

    .top-image {
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
      height: 175px;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      @include media-breakpoint-down(md) {
        height: 155px;
      }
    }
  }

  .bottom {
    height: 45%;
    background: white;
    align-self: end;
    width: inherit;
    border-bottom-right-radius: 13px;
    border-bottom-left-radius: 13px;

    .bottom-text {
      text-align: center;
      margin: 3% 0;
    }
  }
}
</style>
