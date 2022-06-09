<template>
  <div
    v-editable="blok"
    class="material-prices"
  >
    <ul id="matierial-prices-list">
      <li v-for="material in materials" :key="material.id" class="material">
        {{ material.internal_name }}
      </li>
    </ul>
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
  }
}
</script>

<style lang="scss" scoped>

.material-prices {
  display: flex;
  @include margin-page-wide();
  @include media-breakpoint-down(md) {
    flex-direction: column;
  }
  justify-content: center;

  .material {
    background-color: deeppink;
  }
}
</style>
