<template>
  <div v-if="story">
    <div class="preview-wrapper">
      <div class="workshop-preview">
        <router-link
          class="story"
          :to="'/' + story.full_slug">
          <div
            class="banner"
            :style="{ 'background-image': 'url(' + $resizeImage(workshop.image, '700x0') + ')' }"
          />
          <div class="title">
            {{ workshop.title }}
          </div>
          <div
            v-if="workshop.subtitle"
            class="subtitle"
          >
            {{ subtitle }}
          </div>
          <div class="teaser">
            <markdown
                :value="teaser"
                class="info-text"
            />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      story: null,
      workshopInformation: ''
    }
  },
  computed: {
    workshop () {
      return this.story.content
    },
    subtitle () {
      return this.workshopInformation.split('\n')[0].slice(4)
    },
    teaser () {
      return this.workshopInformation.split('\n').splice(1).join('\n')
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
    async getPretixData () {
      if (this.story.content.pretix_shortform) {
        const events = await this.$store.dispatch('getPretixEvents', this.story.content.pretix_shortform)
        this.workshopInformation = events.pop().frontpage_text['de-informal']
      }
    },
    open () {
      this.$router.push({ path: this.story.full_slug })
    }
  },
  updated () {
    this.getPretixData()
  }
}
</script>
<style lang="scss" scoped>
.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  .workshop-preview {
    padding: 20px;
    width: 600px;
    @include media-breakpoint-down(sm) {
      width: 330px;
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
      background-color: white;

      &:hover {
        box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.2);
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
        position: relative;
        z-index: 1;
        flex: 1;
        font-family: $font-mono;
        line-height: 1.6;
        font-size: 0.9rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        hyphens: auto;
        @include media-breakpoint-down(sm) {
          font-size: 0.7rem;
          width: 100%;
        }
      }
    }
  }
}
</style>
