<template>
  <div class="section">
    <h2>{{ $t('contactDetails') }}</h2>
      <form class="form">
      <!--
      <div class="form-item">
        <span class="label">Vorname</span>
        <input class="input-text" disabled type="text" v-model="onboardingData.profile.firstName" name="" id=""/>
      </div>
      <div class="form-item">
        <span class="label">Nachname</span>
        <input class="input-text" disabled type="text" v-model="onboardingData.profile.lastName" name="" id=""/>
      </div>
      -->
      <div class="form-item">
        <span class="label">{{ $t('dateOfBirth') }}<span class="red">*</span></span>
        <input class="input-text" ref="firstInput" type="date" v-model="onboardingData.profile.birthdate" name="" id="onboarding_birthdate"/>
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
        <input class="input-text" type="text" v-model="onboardingData.profile.address2" name="" id="onboarding_address2"/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('zipCode') }} <span class="red">*</span></span>
        <input class="input-text" type="number" v-model="onboardingData.profile.zip" name="" id="onboarding_zip"/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('city') }} <span class="red">*</span></span>
        <input class="input-text" type="text" v-model="onboardingData.profile.city" name="" id="onboarding_city"/>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('company') }}</span>
        <input class="input-text" type="text" v-model="onboardingData.profile.company" name="" id="onboarding_company"/>
      </div>
    </form>
  </div>
</template>

<script>
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
      loading: false
    }
  },
  mounted () {
    this.$refs.firstInput.focus()
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles.scss';
.form {
  margin-left: -6em;
}
.red {
  color: $color-red;
}
.form-item {
  min-width: 27em;
}
</style>
