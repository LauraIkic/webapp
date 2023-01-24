<template>
  <section class="util__container" v-if="workshop">
    <workshop-header :blok="workshop.content"></workshop-header>
    <workshop-info :blok="workshop.content" :dates="dates"></workshop-info>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  data () {
    return {
      uid: null
    }
  },
  mixins: [storyblokLivePreview],
  asyncData (context) {
    return context.store.dispatch('loadWorkshopItem', context.params.slug)
  }
/*  computed: {
    memberWorkshops () {
      return this.$store.getters.getMemberWorkshopById(Number(this.uid))
    }
  }*/
}
</script>

<style lang="scss" scoped>
</style>
