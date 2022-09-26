<template>
  <div
    v-editable="blok"
  >
    <div v-if="blok.title" class="title"> {{blok.title}}</div>
    <div class="grid">
      <component
          :is="blok.component"
          v-for="blok in blok.columns"
          :key="blok._uid"
          :blok="blok"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 2rem;
  margin-left: 120px;
  font-weight: bold;
}
.grid {
  display: flex;
  @include margin-page-wide();
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  justify-content: center;
}
</style>
