<template>
  <div class="section" v-if="memberPackages && memberStorage && availableStorage">
    <h2>{{ $t('membership') }}</h2>
    <div
        v-for="userPackage of membership"
        :key="userPackage.id">
      <package
          :user-package="userPackage"
          :storage=false />
    </div>
    <div
        v-for="userPackage of memberStorage"
        :key="userPackage.id">
      <package
          :user-package="userPackage"
          :storage=true
          :booked=true
      />
    </div>

    <h2>Lager buchen</h2>
    <div
        v-for="userPackage of availableStorage"
        :key="userPackage.id">
      <package
          :user-package="userPackage"
          :storage=true
          :booked=false
      />
    </div>

  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      memberPackages: null,
      membership: null,
      memberStorage: null,
      availableStorage: null
    }
  },
  async mounted () {
    //all packages from the current member
    this.memberPackages = await this.$store.dispatch('getMemberPackages', this.$store.state.member.id)

    // membership of the current member
    this.membership = this.memberPackages.filter((p) => {
      const notes = JSON.parse(p._embedded.package.notes)
      return !notes.is_storage_box
    })

    // storage of the current member
    this.memberStorage = this.memberPackages.filter((p) => {
      const notes = JSON.parse(p._embedded.package.notes)
      return notes.is_storage_box
    })

    //all packages available
    this.packages = await this.$store.dispatch('getPackages')
    this.availableStorage = this.packages.filter((p) => {
      const notes = JSON.parse(p.notes)
      return notes.is_storage_box && notes.shop_visible
    })
  }

}
</script>

<style lang="scss">
</style>
