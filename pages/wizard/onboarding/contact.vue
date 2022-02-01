<template>
  <div class="section">
      <h2>{{ $t('signupMakerSpace') }} <br><br>MEMBER #{{this.user.profile.memberNumber}}</h2>
      <p>{{ $t('beforeYouCanStart') }}</p>
    <form class="form">
      <div class="form-item">
        <span class="label">{{ $t('dateOfBirth') }}<span class="red">*</span></span>
        <input class="input-text"  ref="firstInput" type="date" v-model="onboardingData.profile.birthdate" name=""
               id="onboarding_birthdate"/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('phone') }} <span class="red">*</span></span>
        <input class="input-text" type="tel" v-model="onboardingData.profile.phone" name="" id="onboarding_phone"/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('address') }} <span class="red">*</span></span>
        <input class="input-text" type="text" v-model="onboardingData.profile.address" name="" id="onboarding_address"/>
      </div>
      <div class="form-item">
        <span></span>
        <input class="input-text" type="text" v-model="onboardingData.profile.address2" name=""
               id="onboarding_address2"/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('zipCode') }} <span class="red">*</span></span>
        <input class="input-text" type="number" v-model="onboardingData.profile.zip" name="" id="onboarding_zip"/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('city/location') }} <span class="red">*</span></span>
        <input class="input-text" type="text" v-model="onboardingData.profile.city" name="" id="onboarding_city"/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('cooperation') }}</span>
        <input class="input-text" type="text" v-model="onboardingData.profile.company" name="" id="onboarding_company"/>
      </div>
    </form>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  middleware: 'authenticated',
  props: {
    onboardingData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      invoiceContact: {}
    }
  },
  mounted () {
    this.$refs.firstInput.focus()
  },
  computed: {
    user () {
      if (this.$store.state.user) {
        this.loadUserData()
      }
      return this.$store.state.user
    },
    invoice () {
      return this.invoiceContact
    }
  },
  methods: {
    loadUserData () {
      this.loading = true
      this.$store.dispatch('getUserMetadata')
        .then((data) => {
          this.invoiceContact = data.data.invoice_contact
          this.onboardingData.profile.address = this.user.profile.address
          this.onboardingData.profile.address2 = this.user.profile.address2
          this.onboardingData.profile.zip = this.user.profile.zip
          this.onboardingData.profile.city = this.user.profile.city
        })
        .catch((error) => {
          console.log(error.response.status, error.response.data.msg)
          this.$toast.show('Ein Fehler ist aufgetreten', {
            theme: 'bubble'
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';

.form {
  margin-left: -6em;
  @include media-breakpoint-down(md) {
    margin-left: 0em;
  }
}

.red {
  color: $color-red;
}

.form-item {
  min-width: 27em;
  @include media-breakpoint-down(md) {
    min-width: auto;
  }
}
</style>
