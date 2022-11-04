<template>
  <div
    v-editable="blok"
    class="two-videos-column"
    style="margin: 50px 0;"
  >
    <div class='wrapper'>
      <div class='row'>
        <div class='column column1'>
          <div v-if="blok.video_1">
            <div class="video">
              <iframe :src="blok.video_1"
                      width="100%"
                      height="480"
                      title="Video 1"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen/>
            </div>
          </div>
        </div>
        <div class='column column2'>
          <div v-if="blok.video_2">
            <div class="video">
              <iframe :src="blok.video_2"
                      width="100%"
                      height="480"
                      title="Video 2"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen/>
            </div>
          </div>
        </div>
      </div>
      <div class='row'>
        <div class='column'>
          <img class="image" width="100%" :src="blok.image">
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
