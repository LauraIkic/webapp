<template>
  <section>
    <div class="press-page">
      <div class="headline">
        <h1 class="headline-text"> {{ $t('press') }}</h1>
      </div>
        <press-contact :key="p.id" v-for="p in story.content.body" :story="p"></press-contact>
      <div class="press-post-title" > {{ $t('pressReleases') }}</div>
      <div class="press-preview">
        <press-post-preview :key="p.id" v-for="p in pressToDisplay" :story="p"></press-post-preview>
      </div>
      <details>
        <summary style="cursor:pointer" class="to-all-posts">  {{ $t('allPressReleases') }}</summary>
        <div class="all-press-posts">
          <press-post-preview :key="p.id" v-for="p in press" :story="p"></press-post-preview>
        </div>
      </details>
      <div class="images">
        <press-image-slider :story="images"></press-image-slider>
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
export default {
  mixins: [storyblokLivePreview],
  props: ['blok'],
  data () {
    return {
      page: [],
      press: [],
      loading: false
    }
  },
  async asyncData  (context) {
    const press = await context.store
      .dispatch('loadPress')
      .catch(e => {
        context.error({
          statusCode: e.response.status,
          message: e.response.statusText
        })
      })
      .then(res => {
        return { press: res.stories }
      })
    const page = await context.store.dispatch('loadPage', '/press').catch(e => {
      context.error({
        statusCode: e.response.status,
        message: e.response.statusText
      })
    })
    return { ...page, ...press }
  },
  methods: {
    update () {
      this.loading = true
      this.$store.dispatch('findPress', this.filters).then(data => {
        this.loading = false
        this.press = data.stories
      }).catch((e) => {
        this.loading = false
      })
    }
  },
  computed: {
    images () {
      return this.story.content.Images
    },
    pressToDisplay () {
      if (!this.press) return
      return this.press.slice(0, 3)
    },
    filters () {
      // eslint-disable-next-line camelcase
      const filter_query = {
        component: { in: 'press-overview' }
      }
      return { filter_query }
    }
  }
}
</script>

<style lang="scss">
@import "/assets/scss/styles.scss";
.press-page{
  max-width: 1264px;
  width: 100%;
  background: none;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  flex-flow: column;
  .headline{
    font-family: Chakra Petch;
    padding: 10px;
    background-color: white;
    .headline-text{
      max-width: 1000px;
      margin-left: auto;
      margin-right: auto;
      color:black;
      font-size: 5rem;
      display: flex;
      font-family: Chakra Petch;
      @include media-breakpoint-down(xs) {
        font-size: 3.5rem;
        max-width: 350px;
      }
    }
  }
  .press-post-title{
    display: flex;
    justify-content: center;
    font-size: 3rem;
    margin-top: 5%;
    font-weight: bold;
    font-family: Chakra Petch;
    @include media-breakpoint-down(xs) {
      font-size: 2rem;
      margin-top: 15%;
    }
  }
  .to-all-posts{
    display: flex;
    font-family: Chakra Petch;
    justify-content: center;
    font-size: 2rem;
    margin-top: 5%;
    &:hover {
      text-decoration: underline;
    }
    @include media-breakpoint-down(xs) {
      margin-top: 15%;
      font-size: 1.5rem;
      text-decoration: underline;
    }
  }
  .images{
    margin-top:10%;
    background: black;
  }
  @include media-breakpoint-down(md) {
    .headline{
      .headline-text{
        margin-left:10%;
      }
    }
  }
  }
  .all-press-posts{
    background: #0001;
    padding-top: 53.5px;
    padding-bottom: 53.5px;
    margin-top: -5%;
    @include media-breakpoint-down(xs) {
      margin-top: -10%;
    }
  }
  .small-arrow{
    display: inline-block;
    position: relative;
    border-top: .1em solid black;
    margin: 0.4em 1em;
    transition: transform .15s ease-out;

    &:after {
      content: "";
      position: absolute;
      right: -.1em;
      top: -.05em;
      border-right: .1em solid black;
      border-top: .1em solid black;
      width: .5em;
      height: .5em;
      transform-origin: right top;
      transform: rotate(45deg);
    }
    details[open] > summary:before {
      transform: rotate(90deg);
    }
  }
</style>
