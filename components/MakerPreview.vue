<template>
  <div v-if="story">
    <div class="preview-wrapper">
      <div class="maker-preview">
        <nuxt-link class="link"
            :to="story.slug"
        >
          <div class="display-maker">
            <div class="banner" :style="{ 'background-image': 'url(' + $resizeImage(maker.image, '200x0') + ')' }"/>
            <div class="spacer"></div>
            <div class="maker-information">
              <div class="name">
                {{ maker.name }}
              </div>
              <br>
              <div class="description">
                {{ maker.short_description }}
              </div>
              <br>   <br>
              <div>In der Grand Garage seit:</div>
              <br>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      story: null
    }
  },
  computed: {
    maker () {
      return this.story.content
    }
  },
  created () {
    this.$store.app.$storyapi.get(`cdn/stories/${this.id}`, {
      find_by: 'uuid'
    }).then((res) => {
      this.story = res.data.story
    }).catch((e) => {
    })
  },
  methods: {
    open () {
      this.$router.push({ path: this.story.full_slug })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';

.display-maker {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-content: space-between;
  .banner{
    width:80vw;
    background-position: center;
    background-repeat: no-repeat;
  }
  .spacer{
    width:10vw;
  }
  @include media-breakpoint-down(md){
    flex-flow: column;
  }
}
.link{
  color:black;
}
.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  .maker-preview {
    padding: 20px;
    width: 80%;
    .loading {
    }

    .loading,
    .story {
      display: block;
      padding: 10px;
      cursor: pointer;
      text-decoration: none;
      color: #000;
      &:hover {
        background-color: lighten($color-bright-bg, 3);
      }

      .banner {
        height: inherit;
        width: 60%;
        background-size: cover;
        background-position: center;
      }

      .name {
        margin: 1em 0 0.2em 0;
        font-weight: normal;
        font-size: 1.5rem;
        font-family: $font-secondary;
      }

      .subtitle {
        margin-bottom: 0.5em;
        font-weight: normal;
        font-size: 1rem;
        font-family: $font-mono;
      }

      .teaser {
        font-size: 1rem;
        font-family: $font-mono;
      }
    }
  }
}
</style>
