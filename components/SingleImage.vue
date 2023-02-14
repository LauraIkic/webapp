<template>
  <div
      v-editable="blok"
      class="single-image"
      style="margin: 50px 0;"
  >
    <div class='wrapper'>
      <div class='row'>
        <div class='column'>
          <img class="image" width="100%" :src="blok.image.filename">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>

.headline {
  font-size: 1.6em;
  @include media-breakpoint-up(lg) {
    width: 700px;
    font-size: 2.7em;
  }
  position: relative;
  margin-left: 7%;
  letter-spacing: 2px;
  line-height: 1.5;
  font-weight: 600;
  font-family: $font-secondary;

  p {
    margin: 0;
  }
}

.text {
  @include media-breakpoint-up(lg) {
    width: 900px;
    margin: 0 0 2% 12%;
  }
  @include media-breakpoint-down(md) {
    margin: 3% 15% 10%;
    font-size: 0.9em;
    line-height: 1.6;
  }
  margin-top: 0;
  font-weight: normal;
  font-family: $font-primary;
  line-height: 1.6;
  font-size: 1.1em;
  letter-spacing: .03em;
}
.row {
  display: flex;
  flex-direction: row; //default
  @include media-breakpoint-down(sm) {
    flex-direction: column;
  }
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  min-height: 100px;

  .content {
    height: 100%;
    padding: 5px;
  }

  .column1 {
    flex-basis: 50%;
  }

  .column2 {
    flex-basis: 50%;
  }
}
.image {
  margin: auto;
  display: block;
  max-width: 100%;
  max-height: 100%;
}
.column {
  padding: 0.3em;
  flex: 1;
}
</style>
