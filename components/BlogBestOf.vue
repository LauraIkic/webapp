<template>
  <div class="blog-best-of">
    <div class="headline">
      <h1 class="headline-title">BLOG</h1>
      <a class="link" href="https://grandgarage.eu/de/news/">
        <div class="arrow"></div>
        {{ $t('toBlog') }}
      </a>
    </div>
    <div class="blogItems">
      <BlogItem :blog="news" v-for="news of newsToDisplay" :key="news.id" class="item"/>
    </div>
  </div>
</template>

<script>
import BlogItem from './BlogItem'
export default {
  components: {
    BlogItem
  },
  data: () => ({
    news: null
  }),
  async mounted () {
    const filters = {
      filter_query: {
        component: {
          in: 'news-overview'
        }
      }
    }
    this.news = await this.$store.dispatch('findNews', filters).then(data => {
      return data
    })
  },
  computed: {
    newsToDisplay () {
      if (!this.news) return
      return this.news.stories.slice(0, 3)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';

.blog-best-of {
  @media (min-width: 1460px){
    background-color: black;
  }
  margin: 0 -10px;
  padding: 30px;
  color: #FFF;
  z-index: 2;
  position: relative;

  .headline {
    background-color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 4vw;
  }

  .headline-title {
    font-size: 3rem;
    @include media-breakpoint-down(xs) {
      font-size: 2.2rem;
    }
    font-family: $font-secondary;
    line-height: 1.4;
    letter-spacing: 1.4px;

    color: #FFFFFF;
  }

  .blogItems {
    display: flex;
    @media (max-width: 1460px) {
      flex-direction: column;
      padding: 0 0em;
    }
    background-color: black;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 5em;
  }
}
.arrow {
  display: inline-block;
  position: relative;
  width: 4em;
  @include media-breakpoint-down(sm) {
    width: 55%;
  }
  border-top: .1em solid #FFFFFF;
  margin: .25em 1em;
  transition: transform .15s ease-out;

  &:after {
    content: "";
    position: absolute;
    right: -.1em;
    top: -.05em;
    border-top: .1em solid #FFFFFF;
    border-right: .1em solid #FFFFFF;
    width: .5em;
    height: .5em;
    transform-origin: right top;
    transform: rotate(45deg);
  }
}

.link {
  color: white;
  display: block;
  padding-right: 7vw;
  font-size: 1.3rem;
}

.link:hover {
  .arrow {
    transform: translateX(.5em);
  }
}
</style>
