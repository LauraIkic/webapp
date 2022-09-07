<template>
  <div
    v-editable="blok"
    class="page-list"
  >
    <page-card
      v-for="i in blok.items"
      :key="i.uid"
      :blok="i"
      class="page-card"
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
  justify-content: center;
  padding: 30px;
  margin: 5% 0 2% 0;
  @media screen and (max-width: 799px) {
    flex-direction: column;
    align-items: center;
    margin: 5%;
  }
  .page-card {
    margin: 0 2%;
  }
}
</style>
