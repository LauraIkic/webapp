<template>
  <section class="util__container">
    <let-it-snow
      v-bind="snowConf"
      :show="showSnow"
    ></let-it-snow>
    <component
      :is="story.content.component"
      v-if="story && story.content && story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    />
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  mounted () {
    this.showSnow = true
  },
  mixins: [storyblokLivePreview],
  asyncData (context) {
    const path = '/' + context.route.params.pathMatch
    return context.store.dispatch('loadPage', path).catch((e) => {
      context.error({ statusCode: e.response.status, message: e.response.statusText })
    })
  },
  data () {
    return {
      story: null,
      snowConf: {
        windPower: 0,
        speed: 1,
        count: 10,
        size: 8,
        opacity: 0.50,
        images: ['https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png',
          'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/sock.png',
          'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/tree.png']
      },
      showSnow: false
    }
  }
}
</script>
