<template>
  <div
    v-editable="blok"
    class="about-info"
  >
    <div class="col-start">
      <div class="headline">
        {{ blok.headline }}
      </div>
      <div class="list">
        <markdown :value="blok.list" />
      </div>
    </div>
    <div class="col-end">
      <div class="content">
        <markdown :value="blok.content" />
      </div>
      <div class="image-wrapper">
        <img
          class="image"
          :src="$resizeImage(blok.image, '950x0')"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
@import '/assets/scss/styles.scss';

.about-info {
  display: flex;
  @include media-breakpoint-down(md) {
    padding-top: 5vh;
    flex-direction: column;
  }
  position: relative;
  margin: 0 0 0 12%;
  .col-start {
    flex: 1;
    z-index: 2;
    .headline {
      color: $color-blue;
      font-weight: bold;
      @include media-breakpoint-up(lg) {
        padding: 0 10% 10% 29%;
        font-size: 2.5em;
        width: 85%;
      }
      @include media-breakpoint-down(md) {
        padding: 0 3.4vw 2vh;
        font-size: 1.6em;
        margin-right: 5%;
      }
      line-height: 1.2;
      letter-spacing: 0.03em;
      font-variant-ligatures: no-common-ligatures;
    }
    .list {
      background: #fff;
      padding: 5%;
      margin: 0 3% 0 20%;
      font-weight: bold;
      color: $color-blue;
      font-size: 1.3em;
      @include media-breakpoint-down(md) {
        font-size: 1.1em;
        margin: 0 0 0 5%;
        padding: 2%;
        width: 100%;
      }
      letter-spacing: .02em;
      font-variant-ligatures: no-common-ligatures;
      line-height: 1.2;
      width: 70%;
      ul {
        li {
          margin-bottom: 1.3em;
        }
      }
    }
  }
  .col-end {
    z-index: 1;
    flex: 1;
    .content {
      position: relative;
      z-index: 1;
      padding: 0 35% 0 0;
      margin-top: 7vh;
      font-size: 1.1em;
      @include media-breakpoint-down(md) {
        font-size: 1em;
        margin-bottom: 5%;
        padding: 0 9% 0 0;
      }
      letter-spacing: .03em;
      line-height: 1.6;
    }
  }
  .image-wrapper {
    @include media-breakpoint-up(lg) {
      .image {
        position: relative;
        display: block;
        width: 120%;
        margin-left: -20%;
      }
    }
    @include media-breakpoint-down(md) {
      text-align: right;
      .image {
        max-height: 50vh;
        max-width: 100%;
        align-self: flex-end;
        margin-bottom: -2px;
      }
    }
  }

}
</style>
