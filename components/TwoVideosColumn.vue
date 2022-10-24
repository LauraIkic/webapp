<template>
  <div
    v-editable="blok"
    class="two-videos-column"
  >
    <div>
      {{blok.video_1}} <br>
      {{blok.video_2}} <br>
      {{blok.image}}
    </div>
    <div class='wrapper'>
      <div class='row'>
        <div class='column column1'>
          <div v-if="blok.video_1" class='content'>
            <div class="video">
              <iframe
                width="100%"
                height="480"
                :src=getEmbedVideoUrl(blok.video_1)
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
                :src=getEmbedVideoUrl(blok.video_2)
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
        <img class="image" src="blok.image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  methods: {
    getEmbedVideoUrl (videoUrl) {
      console.log('hujghvhu')
      if (this.isYouTubeUrl(videoUrl)) {
        console.log('getYOUTUBEURL')
        return 'https://www.youtube.com/embed/' + this.getYouTubeVideoIdFromUrl(videoUrl)
      }
      if (this.isVimeoUrl(videoUrl)) {
        console.log('getVIMEOURL')
        return 'https://player.vimeo.com/video/' + this.getVimeoIdFromUrl(videoUrl)
      }

      console.log('video format is unkown')

      return 'unkown url'
    },
    isVimeoUrl (videoUrl) {
      console.log('vimeo?', videoUrl.contains('vimeo.com'))
      return !!videoUrl.contains('vimeo.com')
    },
    isYouTubeUrl (videoUrl) {
      console.log('youtube?', videoUrl.contains('youtube.com'))
      if (videoUrl.startsWith('https://www.youtube.com/watch?v=') ||
        videoUrl.startsWith('https://youtu.be') ||
        videoUrl.contains('youtube.com')) {
        return true
      }
      return false
    },
    getVimeoIdFromUrl (videoUrl) {
      console.log('vimdeoID?')
      const match = /vimeo.*\/(\d+)/i.exec(videoUrl)
      // If the match isn't null (i.e. it matched)
      if (match) {
        return match[1]
      }
    },
    getYouTubeVideoIdFromUrl (videoUrl) {
      // regex pattern to look for a youTube ID
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      //Match the url with the regex
      const match = videoUrl.match(regExp)
      //Return the result
      console.log('youtubeID?', match)
      return match && match[2].length === 11 ? match[2] : undefined
    }
  }
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
    flex-basis: 40%;

    .content {
      background-color: #b0b0b0;
    }
  }

  .column2 {
    flex-basis: 60%;

    .content {
      background-color: #c9c9c9;
    }
  }
}

//.two-videos-column {
//  @include media-breakpoint-down(md) {
//    display: flex;
//    padding-top: 5vh;
//    flex-direction: column;
//  }
//  @include media-breakpoint-up(lg) {
//    margin: 0;
//  }
//  position: relative;
//  margin: 0 0 0 12%;
//
//  .col {
//    @include media-breakpoint-up(lg) {
//      display: flex;
//      align-items: center;
//      position: relative;
//    }
//
//    .col-start {
//      flex: 1;
//      z-index: 2;
//
//      .list {
//        background: #fff;
//        padding: 5%;
//        margin: 20% 3% 0 30%;
//        color: $color-blue;
//        font-size: 1.1em;
//        @include media-breakpoint-down(md) {
//          font-size: 1.1em;
//          margin: 0 0 0 5%;
//          padding: 2%;
//          width: 100%;
//        }
//        letter-spacing: .02em;
//        font-variant-ligatures: no-common-ligatures;
//        line-height: 1.2;
//        width: 70%;
//
//        ul {
//          li {
//            margin-bottom: 1.3em;
//            margin-left: 7%;
//          }
//        }
//      }
//    }
//
//    .col-end {
//      z-index: 1;
//      flex: 1;
//
//      .content {
//        position: relative;
//        z-index: 1;
//        padding: 0 18% 0 0;
//        margin-top: 7vh;
//        @include media-breakpoint-up(lg) {
//          margin: 0 0 15% 15%;
//        }
//        font-size: 1.1em;
//        @include media-breakpoint-down(md) {
//          font-size: 1em;
//          margin-bottom: 5%;
//          padding: 0 9% 0 0;
//        }
//        letter-spacing: .03em;
//        line-height: 1.6;
//      }
//    }
//
//    .image-wrapper {
//      @include media-breakpoint-up(lg) {
//        .image {
//          position: relative;
//          display: block;
//          width: 120%;
//          margin-left: -20%;
//        }
//      }
//      @include media-breakpoint-down(md) {
//        text-align: right;
//        .image {
//          max-height: 50vh;
//          max-width: 100%;
//          align-self: flex-end;
//          margin-bottom: -2px;
//        }
//      }
//    }
//  }
//}
</style>
