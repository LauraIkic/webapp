<template>
  <nuxt-link :to="localePath('/de/press/' +postItemSlug)">
    <div class="press-post-preview">
      <div class="icons">
        <div class="folder">
          <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="external-link"><title>In neuem Fenster öffnen</title><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </div>
       <div class="press-information">
        <div class="title">
          {{ postItem.Title }}
        </div>
        <div class="teaser">
          {{ postItem.Teaser }}
        </div>
      </div>
      <div class="date">
        {{ postItemDate }}
      </div>
<!--      <div class="to-full-press-post">
        <div class="arrow"></div>
      </div>-->
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
  .press-post-preview{
    background: #fdfdfc;
    padding: 30px;
    width: 100%;
    height: 28vh;
    display: flex;
    flex-flow: column;
    border-radius: 5px;
    &:hover{
      .title{
        color: $color-secondary;
      }
    }
    .icons{
      display: flex;
      justify-content: space-between;
      width: inherit;
      .external-link{
        color: #bbb;
        &:hover{
          color: $color-secondary;
        }
      }
      svg{
        width: 30px;
      }
      .folder{
        svg{
          width: 50px;
        }
      }
    }
    .press-information{
      margin-top: 50px;
      color: black;
      height: inherit;
      .title{
        font-family: "Roboto Mono", monospace;
        margin-bottom: 15px;
      }
      .teaser{
        position: relative;
        z-index: 1;
        flex: 1;

        line-height: 1.6;
        font-size: 0.9rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;

      }
    }
  }
</style>
