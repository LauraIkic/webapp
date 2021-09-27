<template>
  <div class="press-body">
    <div class="press">
      <component :is="blok" v-for="blok in blok" :key="blok._uid" :blok="blok"></component>
    </div>
    <div >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Press',
  props: ['blok']
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
.press-body{
  background-color: #72A4B2;
}
.images{
  background-color:green;
  height: 20vh;
}
</style>
