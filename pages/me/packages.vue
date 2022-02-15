<template>
  <div class="section">
    <h2>{{ $t('membership') }}</h2>
    {{user.packages.recurringFeePeriod}}
    <package  :user-package="activePackageItem" />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  computed: {
    user () {
      return this.$store.state.user
    },
    activePackageItem () {
      let packageSize = this.$store.state.user.packages.length
      packageSize = packageSize - 1
      // active element = last element
      return this.$store.state.user.packages[packageSize]
    }
  }
}
</script>

<style lang="scss">
</style>
