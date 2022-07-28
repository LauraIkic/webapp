<template>
  <div
      v-editable="blok"
      class="video-blok"
  >
    <div class="video-container">
      <div
          class="col-start"
      >
        <h2
            v-if="blok.headline"
            class="headline"
        >
          <markdown :value="blok.headline" />
        </h2>
      </div>
      <div class="col-end">
        <p
            v-if="blok.text"
            class="text"
        >
          <markdown :value="blok.text" />
        </p>
      </div>
      <div class="video" v-if="blok.video">
        <iframe width="1255" height="710" :src="blok.video" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
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

.video-blok {
  color: #000;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  margin: 2rem 0 4rem 0;

  .video-container {
    max-width: 100%;
    position: relative;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    @include media-breakpoint-down(md) {
      background-size: 0.8em;
      background-position: 70% -10px;
    }
    @include media-breakpoint-down(xs) {
      background-position: 65% -10px;
    }

    .col-start {
      display: flex;
      align-items: flex-start;
      margin: 50px 70px 0;

      .headline {
        font-size: 1.4em;
        @include media-breakpoint-up(lg) {
          width: 700px;
          font-size: 2.7em;
        }
        position: relative;
        margin: 2% 4%;
        letter-spacing: 2px;
        line-height: 1.5;
        font-weight: 600;
        font-family: $font-secondary;

        p {
          margin: 0;
        }
      }
    }

    .col-end {
      flex: 1;
      display: flex;
      align-self: center;

      .text {
        @include media-breakpoint-up(lg) {
          width: 900px;
          margin: 0 0 2% 0;
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
    }
  }
  .video {
    width: inherit;
    display: flex;
    align-self: center;
    margin: 2% 0;

    & * {
      @include media-breakpoint-down(md) {
        height: 32vh;
        width: 69vw;
        margin-bottom: 10%;
      }
      @include media-breakpoint-down(xs) {
        height: 25vh;
        width: 100%;
        margin-bottom: 10%;
      }
    }
  }
}
</style>
