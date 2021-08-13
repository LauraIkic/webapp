<template>
  <div class="blog-item-display">
    <Nuxt-link :to="{ path: 'de/news/'+blog.slug}"
               class="link"
    >
      <section class="header">
        <div class="image" :style="{ 'background-image': 'url(' + $resizeImage(blog.content.image, '400x250') + ')' }"/>
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
  color: white !important;
}

.header {
  display:flex;
  margin-left: 8%;
  margin-right: 6%;
  flex-flow: column;
  .title-head{
    align-self: flex-start;
  }
  @media (max-width: 1460px) {
    width: auto;
    flex-flow:row;
    padding: 10px;
    margin-bottom: 2vh;
    background-color: #a9a9a95e;
    .title-head{
      padding-left:4vw;
    }
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
  height: calc(37vh - 70px);
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 1460px) {
    height: calc(30vh - 70px);
    width:60%;
  }
}
</style>
