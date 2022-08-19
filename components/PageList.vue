<template>
  <div
    v-editable="blok"
    class="page-list"
  >
    <page-card
      v-for="i in blok.items"
      :key="i.uid"
      :blok="i"
    />
  </div>
</template>

<script>
export default {
  props: ['blok'],
  created () {
  }
}
</script>

<style lang="scss">

.page-list {
  display: flex;
  justify-content: space-around;
  margin: 8%;
  @media screen and (max-width: 799px) {
    flex-direction: column;
    align-items: center;
    margin: 5%;
  }
}
</style>
