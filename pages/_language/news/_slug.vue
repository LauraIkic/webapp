<template>
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
              v-if="item.content.source.length != 0" class="source-img" :src="`/icons/${item.content.source}.png`"
              width="200px"></a><br>
          <span class="info-block">{{ item.content.datetime | date }}</span>
        </div>
      </div>
      <div class="right-content">
        <div class="teaser">
          <vue-markdown>{{ item.content.text }}</vue-markdown>
          <br>
        </div>
        <div>
          <div>Verwendete Maschinen:</div>
          <vue-markdown>{{ item.content.teaser }}</vue-markdown>
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
      <div class="name">... Arbeitsschritte: </div>
      <div class="images">
        <image-slideshow :blok="images"></image-slideshow>
      </div>
    </div>
    <div class="machine">
    <div class="name" > Die Maschinen für das Projekt +{{item.content.machine[0]}}</div>
    <div class="display-machines" v-if="item.content.machines != null">
      <div v-for="machine in item.content.machines" :blok="machine" :key="machine.id" >
        <div>{{machine}}</div>
      </div>
    </div>
    </div>
<!--    <div class="blogFeed-detail">
      <div :key="i" v-for="i in item.content.contentBloks" class="right-content">
          <span v-if="item.content.contentBloks">
            <span v-if="i.text" class="content-text"><vue-markdown>{{ i.text }}</vue-markdown></span>
            <span v-if="i.image" class="img"><img :src="$resizeImage(i.image, '600x0')" alt=""/></span>
          </span>
      </div>
    </div>-->
    <div class="maker" v-if="item.content.person">
      <div class="name">Die Mensch hinter dem Projekt</div>
    </div>
    <div v-if="item.content.links && item.content.links.length != 0">
      <links-slideshow :blok="links"></links-slideshow>
    </div>
  </div>
  <div v-else>
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
        <!--<a v-if="item.link.url && item.link.url != ''" :href="item.link.url" class="info-block"><img v-if="item.source.length != 0" class="source-img" :src="`/icons/${item.source}.png`"></a>-->
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
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
import VotingButton from '../../../components/VotingButton'
import VueMarkdown from 'vue-markdown'

export default {
  components: { VotingButton, VueMarkdown },
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
  mixins: [storyblokLivePreview],
  asyncData (context) {
    return context.store.dispatch('loadNewsItem', context.route.params.slug).then(data => {
      return { item: data.story }
    })
  },

  methods: {
    filters () {
      const sources = this.sources
        .filter(i => i.selected)
        .map(i => i.key)
        .join(',')
      const filterQuery = {
        component: { in: 'news-overview' }
      }
      if (sources) {
        filterQuery.source = { in: sources }
      }
      return { filterQuery }
    }
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
    }
  },
  async asyncDataMachines (context) {
    const tags = await context.store.dispatch('loadTags')
    const filters = {
      filter_query: {
        component: {
          in: 'machine'
        }
      }
    }
    const machines = await context.store.dispatch('findMachines', filters).then((data) => {
      if (data.stories) {
        return { machines: data.stories }
      }
      return { machines: [] }
    })
    return { tags, ...machines }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';

.header {
  height: calc(35vh - 64px);
  position: relative;
}

.header-image {
  height: 100%;
  background-size: cover;
  background-position: 50%;
  @include media-breakpoint-down(sm) {
    height: 65%;
    background-position: 0;
  }
}

.header-title {
  right: 0;
  bottom: 0;
  background-color: #fff;
  min-width: 50%;
  padding-left: 3vw;
  padding-right:7vw;
  @include media-breakpoint-up(sm) {
    position: absolute;
  }
  @include media-breakpoint-down(sm) {
    padding: 25px 10px;
  }

  h4 {
    margin: 0;
    font-size: 4rem;
    font-family: Chakra Petch;
    font-weight: 700;
    @include media-breakpoint-down(sm) {
      font-size: 2rem;
    }
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
  margin-left: 10vw;
}

.left-content {
  & * {
    margin-top: 20px;
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
  padding-left: 8vw;
  font-family: Chakra Petch;
}
.image-slideshow{
  padding-left: 10vw;
  padding-right: 10vw;
}
.swiper-container{
  height: 30vw;
}
.swiper-slide{
     width: 25vw;
     height: 20vw;
   }
.right-content {
  flex-direction: column;
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 50vw;
  margin-left: 13%;

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
      margin-left: 25%;
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
  margin-left: auto;
  margin-right: auto;
  @include media-breakpoint-down(sm) {
    margin-left: 20px;
    margin-right: 20px;
  }
}

.image-container {
  background: #FFFFFF;
}

.images {
  margin: 40px;
  margin-bottom: 0;
  background: #FFFFFF;
}

.links {
  margin: 40px;
}

.video {
  width: inherit;

  & * {
    width: 100%;
    height: 30vw;
  }
}
</style>
