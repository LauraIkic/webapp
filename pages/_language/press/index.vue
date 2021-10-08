<template>
  <section>
    <div class="press-page">
      <div class="headline">
        <h1 class="headline-text">Presse</h1>
      </div>
        <press-contact :key="p.id" v-for="p in story.content.body" :story="p"></press-contact>
      <div class="press-post-title">Pressemitteilungen</div>
      <div class="press-preview">
        <press-post-preview :key="p.id" v-for="p in pressToDisplay" :story="p"></press-post-preview>
      </div>
      <details>
        <summary style="cursor:pointer" class="press-post-title">Alle Pressemitteilungen <div class="arrow"></div> </summary>
        <div class="all-press-posts">
          <press-post-preview :key="p.id" v-for="p in press" :story="p"></press-post-preview>
        </div>
      </details>
      <div class="images">
        <press-image-slider :key="p.id" v-for="p in story.content.Images" :story="p"></press-image-slider>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
export default {
  mixins: [storyblokLivePreview],
  props: ['blok'],
  data () {
    return {
      page: [],
      press: [],
      story: null,
      root: null,
      loading: false
    }
  },
  created () {
    for (let i = 0; i < this.items.length; i++) {
      for (let j = 0; j < this.items[i].items.length; j++) {
        if (this.items[i].items[j].name === 'Header') {
          this.url = this.items[i].items[j].content.image
        }
      }
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
    pressToDisplay () {
      if (!this.press) return
      return this.press.slice(0, 2)
    },
    items () {
      const list = []
      let temp = []
      let currentMonth = null
      let m = null
      if (!this.press || !this.press.length || this.press.length === 0) {
        return []
      }

      this.press.forEach((n) => {
        // n.count = this.votes[n.uuid];
        if (currentMonth !== moment(n.content.datetime).month()) {
          if (currentMonth != null) {
            list.push({ items: temp, label: m.locale('de-at').format('MMMM') })
            temp = []
          }
          m = moment(n.content.datetime)
          currentMonth = m.month()
        }
        if (n.name === 'Header') {
          this.url = n.content.image
          console.log(this.url)
        }
        temp.push({ type: 'item', ...n })
      })
      list.push({ items: temp, label: m.locale('de-at').format('MMMM') })
      return list
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
  .headline{
    padding: 10px;
    background-color: white;
    .headline-text{
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      color:black;
      font-size: 5rem;
      display: flex;
    }
  }
  .press-post-title{
    display: flex;
    justify-content: center;
    font-size: 3rem;
    margin-top: 5%;
  }
  .arrow {
    display: inline-block;
    position: relative;
    width: 4em;
    border-right: .1em solid black;
    border-top: .1em solid black;
    margin: .25em 1em;
    transition: transform .15s ease-out;
    &:after {
      content: "";
      position: absolute;
      right: -.1em;
      top: -.05em;
      border-top: .1em solid black;
      border-right: .1em solid black;
      width: .5em;
      height: .5em;
      transform-origin: right top;
      transform: rotate(45deg);
    }
  }
}
</style>
