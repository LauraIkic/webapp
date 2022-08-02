<template>
  <nuxt-link :to="localePath('/de/press/' +postItemSlug)">
    <div class="press-post-preview">
      <div class="image" :style="{ 'background-image': 'url(' + story.content.Image + ')' }">
<!--
        <img :src="$resizeImage(story.content.Image, '300x200')">
-->
      </div>
      <div class="press-information">
        <div class="title">
          {{ postItem.Title }}
        </div>
        <div class="date">
          {{ postItemDate }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['story'],
  computed: {
    postItem () {
      return this.story.content
    },
    postItemDate () {
      if (this.story.content.Date) {
        return this.story.content.Date.slice(0, 11)
      }
      return null
    },
    postItemSlug () {
      return this.story.slug
    }
  }
}
</script>

<style lang="scss">
.press-post-preview {

  border-radius: 10px;
  background: #fdfdfc;
  width: 300px;
  height: 24rem;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  .image {
      height: 20rem;
      width: 300px;
      border-top-left-radius: 10px;
      background-size: cover;
      object-fit: cover;
      border-top-right-radius: 10px;
  }

  .press-information {
    color: black;
    height: inherit;
    padding: 20px;
    display:flex;
    flex-flow: column;
    justify-content: space-between;
    .title {
      line-height: 1.3;
      font-weight: bold;
    }
  }
  &:hover {
    .image {
      transform: scale(1.05);
      transition: transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms, opacity 1s cubic-bezier(0.4, 0, 0.25, 1) 0ms;
      background-size: cover;
      width: 300px;
      overflow: hidden;
      background-color: rgba(19, 17, 19, 0.41);
      position: relative;
      left: 0;
      transition-duration: 0.4s, 0.5s;
      transition-timing-function: ease, ease-out;
      transition-delay: 0s, 0.4s;
      box-shadow: 0px -40px 71px rgba(0, 0, 0, 0.44);
      transition-property: all;
      z-index: 100;
    }
  }
}
</style>
