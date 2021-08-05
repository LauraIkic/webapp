<template>
  <div class="body">
  <div v-if="item">
    <div class="header">
      <div class="header-image" :style="{ 'background-image': 'url(' + item.content.image + ')' }"></div>
      <div class="header-title">
        <h4>
          <vue-markdown>{{ item.content.title }}</vue-markdown>
        </h4>
        <voting-button v-if="item.content.voting" is-on-detail="true" :uuid="item.uuid"></voting-button>
      </div>
    </div>
      <div class="blogFeed-detail">
        <div class="left-content">
          <div class="social-media-link">
            <a v-if="item.content.link.url != ''" :href="item.content.link.url" class="info-block"><img
                v-if="item.content.source.length != 0" class="source-img" :src="`/icons/${item.content.source}.png`"></a>
            <span class="info-block">{{ item.content.datetime | date }}</span>
          </div>
        </div>
        <div class="right-content">
          <div class="teaser">
            {{ item.content.text }}
          </div><br>
          <div v-if="item.content.materials">
            <div>Verwendete Materialien:</div>
            <vue-markdown>{{ item.content.materials }}</vue-markdown>
          </div>
          <div class="spacer"></div>
          <div class="video" v-if="item.content.video">
            <iframe :src="item.content.video" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
          </div>
        </div>
      </div>
      <div class="image-container" v-if="item.content.images && item.content.images.length != 0">
        <div class="name">Arbeitsschritte:</div>
        <div class="images">
          <image-slideshow :blok="images"></image-slideshow>
        </div>
      </div>
      <div class="machine" v-if="machine">
        <div class="name"> Die Maschinen für das Projekt</div>
        <div class="display-machines">
          <machine-preview
              v-for="m in machine"
              :id="m"
              :key="m"
              class="col"
          />
        </div>
      </div>
      <!--        <div class="blogFeed-detail">
                <div :key="i" v-for="i in item.content.contentBloks" class="right-content">
                    <span v-if="item.content.contentBloks">
                      <span v-if="i.text" class="content-text"><vue-markdown>{{ i.text }}</vue-markdown></span>
                      <span v-if="i.image" class="img"><img :src="$resizeImage(i.image, '600x0')" alt=""/></span>
                    </span>
                </div>
              </div>-->
      <div class="maker" v-if="person">
        <div class="name">Der Mensch hinter dem Projekt</div>
        <div class="display-makers">
          <maker-preview
              v-for="p in person"
              :id="p"
              :key="p"
              class="col"
          />
        </div>
      </div>
      <!--        <div v-if="item.content.links && item.content.links.length != 0">
                <links-slideshow :blok="links"></links-slideshow>
              </div>-->
    </div>
    <!--      <div v-else>
            <div class="header">
              <div class="header-image" :style="{ 'background-image': 'url(' + item.image + ')' }"></div>
              <div class="header-title">
                <h4>{{ item.title }}</h4>
                <voting-button v-if="item.content.voting" is-on-detail="true" :uuid="item.uuid"></voting-button>

              </div>
            </div>
            <div class="blogFeed-detail">
              <div class="left-content">
                <span class="info-block">{{ item.datetime | date }}</span>
                {{ item }}
                &lt;!&ndash;<a v-if="item.link.url && item.link.url != ''" :href="item.link.url" class="info-block"><img v-if="item.source.length != 0" class="source-img" :src="`/icons/${item.source}.png`"></a>&ndash;&gt;
              </div>
              <div class="right-content">
                <div class="teaser">
                  {{ item.teaser }}
                </div>
                <div>
                  {{ item.text }}
                </div>

              </div>
            </div>
            <div class="images" v-if="item.images && item.images.length != 0">
              <image-slideshow :blok="images"></image-slideshow>
            </div>
            <div class="blogFeed-detail">
              <div :key="i" v-for="i in item.contentBloks" class="right-content">
                  <span v-if="item.contentBloks">
                    <span v-if="i.text" class="content-text">{{ i.text }}</span>
                    <span v-if="i.image" class="img"><img :src="$resizeImage(i.image, '600x0')" alt=""/></span>
                  </span>
              </div>
            </div>
            <div v-if="item.links && item.links.length != 0">
              <links-slideshow :blok="links"></links-slideshow>
            </div>
      </div>-->
    </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import VotingButton from '../../../components/VotingButton'
import VueMarkdown from 'vue-markdown'

export default {
  components: { VotingButton, VueMarkdown },
  props: ['blok'],
  mixins: [storyblokLivePreview],
  created () {
    this.$store.app.$storyapi.get(`cdn/stories/${this.id}`, {
      find_by: 'uuid'
    }).then((res) => {
      this.story = res.data.story
    }).catch((e) => {
    })
  },
  data () {
    return {
      // images: [],
      reload: null,
      loading: false,
      sources: [
        { name: 'magazin3', key: 'm3', selected: false },
        { name: 'youtube', key: 'yt', selected: false },
        { name: 'facebook', key: 'fb', selected: false },
        { name: 'twitter', key: 'tw', selected: false },
        { name: 'instagram', key: 'ig', selected: false }
      ],
      item: null
    }
  },
  asyncData (context) {
    return context.store.dispatch('loadNewsItem', context.route.params.slug).then(data => {
      return { item: data.story }
    })
  },
  computed: {
    route () {
      return this.$route.fullPath
    },
    images () {
      return {
        items: this.item.content.images
      }
    },
    links () {
      return {
        items: this.item.content.links
      }
    },
    content () {
      return {
        content: this.item.content.contentBloks.text
      }
    },
    machine () {
      return this.item.content.machine
    },
    person () {
      return this.item.content.person
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';
.body{
  max-width: 1264px;
  width: 100%;
  background: none;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  flex-flow: column;
}
.header {
  height: calc(35vh - 64px);
  position: relative;
}

.header-image {
  height: 100%;
  background-size: cover;
  background-position: inherit;
}

.header-title {
  right: 0;
  bottom: 0;
  background-color: #fff;
  min-width: 50%;
  padding-left: 3vw;
  padding-right: 7vw;
  @include media-breakpoint-up(sm) {
    position: absolute;
  }
  @include media-breakpoint-down(sm) {
    padding: 1px 10px;

  }

  h4 {
    margin: 0;
    font-size: 3rem;
    font-family: Chakra Petch;
    font-weight: 700;
    @include media-breakpoint-down(sm) {
        font-size: 1.6rem;
    }
  }
}
.info-block{
  @include media-breakpoint-down(sm) {
    align-self: baseline;
  }
}
.blogFeed-detail {
  margin-top: 40px;
  color: #000;
  display: flex;
  flex-direction: row;
  flex: 1;
  line-height: normal;
  background: #f2f3ee;;
  font-size: 1.5rem;
  margin-bottom: 7%;
  @include media-breakpoint-down(md) {
    flex-flow: column;
    font-size: 1.1rem;
  }
  /*  @include margin-page-wide();
    @include media-breakpoint-up(md) {
      margin: 0 100px;
    }
    @include media-breakpoint-down(xs) {
      margin-top: 40px;
    }*/
}

.social-media-link {
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 15vw;
  @include media-breakpoint-down(md){
    flex-flow: row;
    width: auto;
    justify-content: space-around;
  }
}

.left-content {
  margin-left: 2vw;
  & * {
    margin-top: 0.5vh;
    color: $color-secondary-border;
  }

  @include media-breakpoint-down(sm) {
    margin-bottom: 20px;
  }
}

.name {
  font-size: 2.5rem;
  font-weight: bold;
  padding-top: 3vh;
  padding-left: 4vw;
  font-family: Chakra Petch;
  margin-top: 5vh;
  margin-bottom: 3vh;
  @include media-breakpoint-down(sm) {
  font-size: 1.3rem;
  }
}

.image-slideshow {
  padding-left: 5vw;
  padding-right: 5vw;
  @include media-breakpoint-down(sm){
    padding-left: 5vw;
    padding-right: 5vw;
  }
}
.right-content {
  flex-direction: column;
  position: relative;
  display: flex;
  width: inherit;
  @include media-breakpoint-down(sm){
    width: 80vw;
  }
  img {
    @include media-breakpoint-down(sm) {
      width: 100%;
    }
  }

  .teaser, .info-text {
    font-weight: normal;
    font-family: $font-primary;
    line-height: 1.8;
    @include media-breakpoint-down(sm) {
      line-height: 1.4;
      font-size: 1rem;
      margin: 0 0 20px 5%
    }
  }

  .spacer {
    height: 4vh;
  }

  .teaser {
    margin: 0;
  }

  .link {
    background-color: $color-orange;
    margin: 2% 0 0 5%;
    text-transform: uppercase;
    @include media-breakpoint-up(md) {
    }
    color: #fff;
    padding: .7em .8em;
    font-weight: 800;
  }

  .content-text {
    padding: 20px 80px;
    @include media-breakpoint-down(sm) {
      padding: 20px 20px;
    }
  }
}

.img {
  display: block;
  width:20vw;
  @include media-breakpoint-down(sm) {
  }
}

.image-container {
  background: #FFFFFF;
}

.images {
  margin-bottom: 0;
  background: #FFFFFF;
  @include media-breakpoint-down(sm) {
    margin: 4px;
  }
}

.links {
  margin: 40px;
}
.display-machines{
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;

  @include media-breakpoint-down(md){
    flex-flow: column;
  }
}
.video {
  width: inherit;
  & * {
    width: 100%;
    height:35vh;
  }
  }
</style>
