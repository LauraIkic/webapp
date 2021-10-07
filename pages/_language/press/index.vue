<template>
  <section>
    <div class="press-page">
    </div>
    <div class="blog-wrapper">
      <div class="blog">
        <div class="headline">
          <p class="headline-text">Presse</p>
        </div>
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
  async asyncData (context) {
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

</style>
