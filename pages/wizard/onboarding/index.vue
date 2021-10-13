<template>
  <div class="section onboarding-wizard">
    <h2>{{ $t('welcomeToTheGG') }}</h2>
    <p class="text">
      {{ $t('memberBenefitsText') }}
      <br>
      {{ $t('memberPerksText') }}
      <br><br>
      {{ $t('ifYouHaveAnyQuestionsRegardingYourMembership') }}
      <br>
      {{ $t('doNotHesitateToAskOurFrontdeskTeam') }}
      <br><br>
      {{ $t('#makersgonnamake') }}
    </p>
<!--    <div class="options">
      <div :class="['option', { selected: onboardingData.paymentType === TYPES.regular }]"
           @click="onboardingData.paymentType = TYPES.regular">
        <span class="name">{{ $t('regular') }} 40{{ $t('euro/month') }}</span>
      </div>
      <div :class="['option', { selected: onboardingData.paymentType === TYPES.reduced }]"
           @click="onboardingData.paymentType = TYPES.reduced">
        <span class="name">{{ $t('discounted') }}15{{ $t('euro/month') }}</span>
        <span class="description">{{ $t('differentCardListing') }}</span>
        <span class="description">{{ $t('pleaseBringAccordingID') }}</span>
      </div>
    </div>-->
    <div>
      <input id="checkbox" type="checkbox" name="checkbox" v-model="onboardingData.rulesAccepted">
      <label for="checkbox">{{ $t('iHaveReadThe') }} <a
          href="https://grandgarage.sharepoint.com/:b:/s/GRANDGARAGE/EQpdYazohn5DtE60FEPxfy4BpQ_1NMXNtoG7rHj3zQnGeQ?e=ewUyWh"
          target="new">{{ $t('factoryRules') }}</a> {{ $t('andAcceptTheTermsAndConditions') }}</label>
    </div>
  </div>
</template>

<script>
const TYPES = {
  regular: 1,
  reduced: 2
}
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
      TYPES,
      loading: false
    }
  },
  created () {
  },
  methods: {},
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';

.onboarding-wizard {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .options {
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    margin: 0 -10px;
    width: 80%;

    .option {
      margin: 10px;
      flex: 1;
      cursor: pointer;
      padding: 25px;
      background-color: #FFF;
      border: 2px solid #FFF;
      display: flex;
      flex-direction: column;

      &:hover {
        border: 2px solid $color-orange;
      }
    }

    .description {
      color: grey;
    }
  }

  .name {
    font-weight: bolder;
    margin-bottom: 1em;
  }

  .text {
    text-align: center;
  }

  .selected {
    border: 2px solid $color-orange !important;
  }

  .spacer {
    flex: 1;
  }
}

</style>
