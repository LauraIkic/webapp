<template>
<div v-editable="blok"
     class="press-post">
  <div class="title">
    Pressemitteilungen
  </div>
<!--  <div class="description">
    {{blok.description}}
  </div>-->
</div>
</template>

<script>
export default {
  props: ['blok'],
  name: 'PressPost'
}
</script>

<style lang="scss">
.press-post{
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  height: 30vh;
  .title{
    font-size: 3rem;
  }
}
@import '../assets/scss/styles.scss';
</style>
