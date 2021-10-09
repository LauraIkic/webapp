<template>
  <nuxt-link :to="postItemSlug">
    <div class="press-post-preview">
      <div class="date">
        {{postItemDate}}
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
    postItemDate () {
      if (this.story.content.Date) {
        return this.story.content.Date.slice(0, 11)
      }
      return null
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
  border-radius: 10px;
  &:hover {
    background-color: #000;
    color: white;
    .arrow{
      border-right: .1em solid white;
      border-top: .1em solid white;
      &:after {
        border-top: .1em solid white;
        border-right: .1em solid white;
      }
    }
}
  .press-information{
     line-height: 1.8;
     padding: 19px;
     width: 30vw;
     .title{
       font-size: 3rem;
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
   }
  @include media-breakpoint-down(sm) {
    width: 90%;
    margin-top: 4vh;
    display: flex;
    flex-flow: column;
    .press-information{
      width:auto;
      .title{
      font-size: 2rem;
    }
    } .date{
        padding: 12px;
        align-self: end;
      }
    .to-full-press-post{
      padding:12px;
      align-self: end;
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
