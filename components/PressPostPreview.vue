<template>
  <nuxt-link :to="postItemSlug">
    <div class="press-post-preview">
      <div class="date">
        DATUM
      </div>
      <div class="press-information">
        <div class="title">
          {{ postItem.Title }}
        </div>
        <div class="teaser">
          {{postItem.Teaser}}
        </div>
      </div>
      <div  class="to-full-press-post">
        <div class="arrow"></div>
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
    postItemSlug () {
      return 'press/' + this.story.slug
    }
  }
}
</script>

<style lang="scss">
@import "/assets/scss/styles.scss";
.press-post-preview{
  color:black;
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
  background:white;
  width: 50vw;
  &:hover {
  background-color: $color-secondary;
}
  .date{
    width:8vw;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .to-full-press-post{
    align-items: center;
    display: flex;
  }
  .press-information{
    line-height: 1.8;
    padding: 19px;
    width: 30vw;
    .title{
      font-size: 3rem;
    }
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
