<template>
  <div>
    <div>  <loading-spinner
        v-if="!(memberPackages && memberStorage && availableStorage)"
        color="#333"
    />
  </div>
  <div class="section" v-if="memberPackages && memberStorage && availableStorage"  >
    <h2>{{ $t('membership') }}</h2>
    <div
        v-for="userPackage of membership"
        :key="userPackage.id">
      <package v-on:reload="reload"
          :user-package="userPackage"
          :storage=false />
    </div>
    <div
        v-for="userPackage of memberStorage"
        :key="userPackage.id">
      <package v-on:reload="reload"
          :user-package="userPackage"
          :storage=true
          :booked=true
      />
    </div>

    <h2>Lager buchen</h2>
    <div
        v-for="userPackage of availableStorage"
        :key="userPackage.id">
      <package v-on:reload="reload"
          :user-package="userPackage"
          :storage=true
          :booked=false
      />
    </div>

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
    await this.reload()
  },
  methods: {
    async reload () {
      this.memberPackages = await this.$store.dispatch('getMemberPackages', this.$store.state.member.id)

      // membership of the current member
      this.membership = this.memberPackages.filter((p) => {
        //console.log(p)
        const notes = p._embedded.package.notes
        return !notes.is_storage_box
      })

      // storage of the current member
      this.memberStorage = this.memberPackages.filter((p) => {
        const notes = p._embedded.package.notes
        return notes.is_storage_box
      })

      //all packages available for booking
      this.packages = await this.$store.dispatch('getPackages')
      // filter already booked storages
      this.availableStorage = this.packages.filter((p) => {
        for (const s of this.memberStorage) {
          if (s.package === p.id) {
            return false
          }
        }
        //handle packages with no notes available for storage & visibility or malformed format
        if (!p.notes) {
          console.error('no notes (storage, visible) for package: ', p)
          return false
        }
        return p.notes.is_storage_box && p.notes.shop_visible
      })
    }
  }

}
</script>

<style lang="scss">
</style>
