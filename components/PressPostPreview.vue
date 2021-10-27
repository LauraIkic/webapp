<template>
  <nuxt-link :to="postItemSlug">
    <div class="press-post-preview">
      <div class="date">
        {{ postItemDate }}
      </div>
      <div class="press-information">
        <div class="title">
          {{ postItem.Title }}
        </div>
        <div class="teaser">
          {{ postItem.Teaser }}
        </div>
      </div>
      <div class="to-full-press-post">
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

.press-post-preview {
  color: black;
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
  background: white;
  width: 50vw;
  border-radius: 10px;
  border-top: black 10px solid;
  box-shadow: 10px 5px 5px #00000024;
  &:hover {
    background: repeating-linear-gradient(45deg, #787877, #787877 70px, rgba(0, 0, 0, 0.8) 70px, rgba(0, 0, 0, 0.8) 140px);
    border-top: 10px solid;
  }

  .press-information {
    line-height: 1.8;
    padding: 19px;
    width: 30vw;
    background: white;
    .title {
      font-size: 2rem;
    }
  }

  .date {
    width: 11vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.3rem;
    border-right: black 1px solid;
    background: white;
  }

  .to-full-press-post {
    align-items: center;
    display: flex;
    background: white;
  }
  @include media-breakpoint-down(md) {
    margin-right: 7%;
    width: 90%;
    margin-top: 4vh;
    display: flex;
    flex-flow: column;
    .press-information {
      width: auto;
      .title {
        font-size: 1.5rem;
        font-weight: bold;
        border-bottom: black 1px solid;
        margin-bottom: 3%;
      }
    }
    .date {
      padding: 12px;
      align-self: end;
      width: auto;
      border-right: none;
      font-weight: normal;
    }
    .to-full-press-post {
      padding: 12px;
      align-self: end;
      border-radius: 10px;
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
      border-right: .1em solid black;
      border-top: .1em solid black;
      width: .5em;
      height: .5em;
      transform-origin: right top;
      transform: rotate(45deg);
    }
  }
}
</style>
