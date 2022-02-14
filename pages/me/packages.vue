<template>
  <div class="section">
    <h2>{{ $t('packages') }}</h2>
    {{user.packages}}
    <ul
      v-if="user && user.packages && user.packages.length > 0"
      class="item-list"
    >
        <package :user-package="p" />
    </ul>
    <div v-else>
      <code>{{ $t('noMembershipConcluded') }}</code>
      <!--
      <div class="link-with-arrow">
        <div class="link-text">
          <div class="link-arrow">
          </div>
          <Nuxt-Link to="/wizard/onboarding/">Mitglied werden</Nuxt-Link>
        </div>
      </div>
      -->
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
