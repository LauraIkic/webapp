<template>
  <div v-if="story">
    <div class="preview-wrapper">
      <div v-if="maker" class="maker-preview">
        <nuxt-link class="story" :to="makerlink">
          <div class="display-maker">
            <div class="banner" :style="{ 'background-image': 'url(' + $resizeImage(maker.image, '250x250') + ')' }"/>
            <div class="spacer"></div>
            <div class="maker-information">
              <br>
              <div class="name">
                {{ maker.name }}
              </div>
              <br>
              <div class="description" v-if="maker.short_description">
                <span>{{ maker.short_description| truncate(200, '...') }}</span>
              </div>
              <br>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="preview-wrapper">
      <div v-if="member" class="maker-preview">
          <div class="display-maker">
            <div class="banner" :style="{ 'background-image': 'url(' + $resizeImage(member.image, '250x250') + ')' }"/>
            <div class="spacer"></div>
            <div class="maker-information">
              <br>
              <div class="name">
                {{ member.title}}
              </div>
              <br>
              <div class="description" v-if="member.text">
                <span>{{ member.text| truncate(200, '...') }}</span>
              </div>
              <br>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    }
  },
  props: ['id'],
  data () {
    return {
      story: null
    }
  },
  computed: {
    maker () {
      return this.story.content
    },
    member () {
      return this.id
    },
    makerlink () {
      return '/de/team/' + this.story.slug
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

.description {
  overflow: hidden;
  text-overflow: '...';
}

.display-maker {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-content: space-between;
  font-size: 1.3rem;
  .banner {
    display:flex;
    justify-content: center;
    width: 250px;
    background-position: center;
    background-repeat: no-repeat;
    height: 250px;
  }

  .name {
    text-transform: uppercase;
    margin-top: 3%;
  }

  .maker-information {
    width: 70%;
  }

  @include media-breakpoint-down(sm) {
    width: 90%;
    margin-left: 3%;
    .banner{
      width: 40%;
      height: 20vh;
      align-self: center;
    }
    .maker-information {
      width: 100%;
    }
    .spacer{
      width: 3%;
    }
  }
  @include media-breakpoint-down(xs) {
    flex-flow: column;
    margin-top: 7%;
    margin-left: 3%;
    .banner {
      width: 60vw;
      height: 30vh;
    }
  }
}

.link {
  color: black;
}

.preview-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  .maker-preview {
    width: 100%;

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
