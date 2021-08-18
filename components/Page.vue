<template>
  <div class="page">
    <component :is="blok.component" v-for="blok in blok.body" :key="blok._uid" :blok="blok">  </component>
    <div v-if="this.$route.path ==='/' || '/de' || '/en'" class="BlogBestOf">
      <BlogBestOf />
    </div>
    <LanguageInput/>
  </div>
</template>

<script>
import LanguageInput from './LanguageInput'
import BlogBestOf from './BlogBestOf'
export default {
  components: {
    BlogBestOf,
    LanguageInput
  },
  props: ['blok']
}
</script>

<style lang="scss">

</style>
