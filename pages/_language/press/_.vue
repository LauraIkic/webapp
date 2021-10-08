<template>
  <section>
 </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return {
      story: null
    }
  },
  mixins: [storyblokLivePreview],
  asyncData (context) {
    return context.store.dispatch('loadFullPage', context.route.fullPath).catch((e) => {
      context.error({ statusCode: e.response.status, message: e.response.statusText })
    })
  }
}
</script>
