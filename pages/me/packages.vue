<template>
  <div class="section">
    <h2>{{ $t('packages') }}</h2>
    {{user.packages.recurringFeePeriod}}
    <package  :user-package="activePackageItem" />
    <ul
      v-if="user && user.packages && user.packages.length > 0"
      class="item-list"
    >
    </ul>
    <div v-else>
      <code>{{ $t('noMembershipConcluded') }}</code>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {}
  },
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
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
