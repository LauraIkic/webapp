<template>
  <div
      v-editable="blok"
      class="material-prices"
  >
    <div
        v-for="material of materials"
        :key="material.id"
        class="material"
    >
      <div class="name">
        {{ material.internal_name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok'],
  middleware: 'authenticated',
  data () {
    return {
      materials: null
    }
  },
  async mounted () {
    this.materials = await this.$store.dispatch('getMaterials')
    console.log(this.materials)
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';

.material-prices {
  display: flex;
  @include margin-page-wide();
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  justify-content: center;

  .material {
    background-color: deeppink;
    height: 100vh;
    width: 100vw;
  }
}
</style>
