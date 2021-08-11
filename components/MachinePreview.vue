<template>
  <div v-if="story">
    <div class="preview-wrapper">
      <div class="machine-preview">
        <nuxt-link class="story" :to="machinelink">
          <div class="display-machine">
            <div class="banner" :style="{ 'background-image': 'url(' + $resizeImage(machine.image, '700x0') + ')' }"/>
            <div class="title">
              {{ machine.title }}
            </div>
            <div v-if="machine.subtitle" class="subtitle">
              {{ machine.subtitle }}
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
    machine () {
      return this.story.content
    },
    machinelink () {
      return '/de/machines/' + this.story.slug
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
.preview-wrapper{
  height: inherit;
}
.display-machines {
  width: 100%;
  display: flex;
  justify-content: flex-start;

  .machine-preview {
    padding: 20px;
    width: 300px;
    height: 25vh;
    @include media-breakpoint-down(xs) {
      height:auto;
    }

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
        height: 200px;
        background-size: cover;
        background-position: center;
      }

      .title {
        margin: 1em 0 0.2em 0;
        font-weight: normal;
        font-size: 1.5rem;
        font-family: $font-secondary;
      }

      .subtitle {
        color: $color-orange;
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
