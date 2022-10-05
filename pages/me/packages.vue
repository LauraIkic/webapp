<template>
  <div class="section" v-if="memberPackages && memberStorage && availableStorage">
    <h2>{{ $t('membership') }}</h2>
    <div
        v-for="userPackage of membership"
        :key="userPackage.id">
      <package  :user-package="userPackage" />
    </div>
    <h2>Lager</h2>
    <div
        v-for="userPackage of memberStorage"
        :key="userPackage.id">
      <package  :user-package="userPackage" />
    </div>

    <h2>Lager buchen</h2>
    <div
        v-for="userPackage of availableStorage"
        :key="userPackage.id">
      <package  :user-package="userPackage" />
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
      //console.log(p.id)
      //console.log(this.storage.package)
      return notes.is_storage_box
    })
    console.log('this.availablePackages: ', this.availableStorage)
    //console.log('storage filtered: ', this.storage)
  }
  // computed: {
  //   user () {
  //     return this.$store.state.user
  //   },
  //   activePackageItem () {
  //     let packageSize = this.$store.state.user.packages.length
  //     packageSize = packageSize - 1
  //     // active element = last element
  //     return this.$store.state.user.packages[packageSize]
  //   }
  // }
}
</script>

<style lang="scss">
</style>
