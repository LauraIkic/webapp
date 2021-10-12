<template>
<div    v-editable="blok" class="press-overview">
  <div class="title">
    {{blok.Title}}
  </div>
  <br>
  <div class="teaser">
    {{blok.Teaser}}
  </div>
  <br>
  <div class="text">
    {{blok.Text}}
  </div>
</div>
</template>

<script>
export default {
  props: ['blok']
}
</script>
<style lang="scss" scoped>
@import "/assets/scss/styles.scss";
.press-overview{
  margin-top:1%;
  max-width: 1000px;
  margin-left:auto;
  margin-right:auto;
  .title{
    font-size:3rem;
    background: white;
    padding:20px;
    padding-top: 60px;
    font-family: Chakra Petch;
  }
  .teaser{
    line-height: 1.8;
    font-weight: bold;
  }
  .text{
    line-height: 1.8;
  }
}
</style>
