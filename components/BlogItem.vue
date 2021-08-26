<template>
  <div class="blog-item-display">
    <nuxt-link :to="localePath('/news/'+blog.slug)" class="link">
      <section class="header">
        <img class="image" :src="blog.content.image">
        <div class="background-square"></div>
        <div class="title-head">
          <code class="title">{{ blog.content.title }}</code>
          <p class="date" v-if="blog.content.datetime">{{ blog.content.datetime | date }}</p>
        </div>
      </section>
    </Nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';
.link {
  color: white;
}
.header {
  @media (max-width: 1460px) {
    padding-bottom: 5vh;
  }
}
.date {
  font-family: $font-secondary;
  font-size: 1.3rem;
}
.title {
  font-size: 1.8rem;
  font-family: $font-secondary;
  line-height: 1.4;
  letter-spacing: 1.4px;
}
.image {
  width: 25vw;
  height: 20vw;
  @media (max-width: 1460px) {
    width: 50vw;
    height: 40vw;
  }
}
</style>
