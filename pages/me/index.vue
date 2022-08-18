<template>
  <div class="section">
    <h2>{{ $t('contactDetails') }}</h2>
    <form
      class="form"
      @submit.prevent="updateMember"
    >
      <div class="form-item">
        <span class="label">{{ $t('firstName') }}</span>
        <input
          id=""
          v-model="member.firstName"
          class="input-text"
          disabled
          type="text"
          name=""
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('lastName') }}</span>
        <input
          id=""
          v-model="member.lastName"
          class="input-text"
          disabled
          type="text"
          name=""
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('address') }}</span>
        <input
          id=""
          v-model="member.address"
          class="input-text"
          type="text"
          name=""
        >
      </div>
      <div class="form-item">
        <span />
        <input
          id=""
          v-model="member.address2"
          class="input-text"
          type="text"
          name=""
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('zipCode') }}</span>
        <input
          id=""
          v-model="member.zip"
          class="input-text"
          type="text"
          name=""
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('city') }}</span>
        <input
          id=""
          v-model="member.city"
          class="input-text"
          type="text"
          name=""
        >
      </div>
      <div class="button-row">
        <div v-if="loading">
          Saving…
        </div>
        <button
          v-else
          type="submit"
          class="input-button-primary"
        >
          <font-awesome-icon icon="save"/> {{ $t('save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    member () {
      return this.$store.state.member
    }
  },
  created () {
  },
  methods: {
    updateMember (event) {
      this.loading = true
      this.$store.dispatch('updateMember', Object.assign({}, this.member)).then(() => {
        this.loading = false
        this.$notify({
          title: 'Yay!',
          text: 'Änderungen gespeichert.'
        })
      }).catch((e) => {
        this.loading = false
        this.$notify({
          title: 'Error',
          type: 'error',
          text: 'Ein Fehler ist aufgetreten.'
        })
      })
    }
  }
}
</script>

<style lang="scss">
</style>
