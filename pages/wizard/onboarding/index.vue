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
    <div class="our-rates">
      <h3>{{ $t('ourRates') }}</h3>
      <ul>
        <li>{{ $t('regular/month') }}</li>
        <li>{{ $t('discounted/month') }}</li>
        <li>{{ $t('differentCardListing') }}{{ $t('pleaseBringAccordingID') }} </li>
        <li>{{ $t('specialConditions') }}</li>
      </ul>
    </div>
    <div class="membership-information">
      Bei einer jährlichen Zahlung schenken wir dir zwei Monate Mitgliedschaft GRATIS!
      Dein Mitgliedsbeitrag sowie zusätzlich anfallende Kosten (Materialkosten, Getränke, etc.) werden von meinem Konto per SEPA-Lastschrift abgebucht.
    </div>
    <br>
    <br>
    <div>
      <input id="checkbox" type="checkbox" name="checkbox" v-model="onboardingData.rulesAccepted">
      <label for="checkbox">{{ $t('iHaveReadThe') }} <a
          href="https://grandgarage.sharepoint.com/:b:/s/GRANDGARAGE/EQpdYazohn5DtE60FEPxfy4BpQ_1NMXNtoG7rHj3zQnGeQ?e=ewUyWh"
          target="new">{{ $t('factoryRules') }}</a> {{ $t('andAcceptTheTermsAndConditions') }}</label>
    </div>
  </div>
</template>

<script>
// const TYPES = {
//   regular: 1,
//   reduced: 2
// }
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
      /*      TYPES, */
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
  line-height: 1.7;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .our-rates {
    margin-top:5%;
    margin-bottom: 5%;
    max-width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
  .membership-information{
    display:flex;
    max-width: 1000px;
    text-align:center;
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
