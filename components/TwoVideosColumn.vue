<template>
  <div
    v-editable="blok"
    class="two-videos-column"
  >
    <div class='wrapper'>
      <div class='row'>
        <div class='column column1'>
          <div v-if="blok.video_1" class='content'>
            <div class="video">
              <iframe
                width="100%"
                height="480"
                :src=blok.video_1
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>
        </div>
        <div class='column column2'>
          <div v-if="blok.video_2" class='content'>
            <div class="video">
              <iframe
                width="100%"
                height="480"
                :src=blok.video_2
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>
        </div>
      </div>
      <div class='row'>
        <div class='column'>
          <img class="image" :src="blok.image">
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

<style lang="scss">

.row {
  display: flex;
  flex-direction: row; //default
  min-height: 100px;

  .content {
    height: 100%;
    padding: 5px;
  }

  .column1 {
    @include media-breakpoint-up(md) {
      flex-basis: 50%;
    }
    flex-basis: 100%;
  }

  .column2 {
    @include media-breakpoint-up(md) {
      flex-basis: 50%;
    }
    flex-basis: 100%;
  }
  .image {
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
}

</style>
