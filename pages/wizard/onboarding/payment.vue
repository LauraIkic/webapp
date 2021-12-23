<!--<script src="../../../utils/helper.js"></script>-->
<template>
  <div class="section onboarding-wizard">
    <h2>{{ $t('howWouldYouPreferToPay') }}</h2>
    <div class="options">
      <div :class="['option', { selected: mutableOnBoarding.paymentFrequency === FREQS.monthly }]"
        @click="mutableOnBoarding.paymentFrequency = FREQS.monthly">
        <b>{{ $t('monthlyPayment') }}</b>
        <p>
          <template v-if="mutableOnBoarding.paymentType === 1">40</template>
          <template v-if="mutableOnBoarding.paymentType === 2">15</template>
          {{ $t('euro/month') }}

        </p>
      </div>
      <div :class="['option', { selected: mutableOnBoarding.paymentFrequency === FREQS.annually }]"
        @click="mutableOnBoarding.paymentFrequency = FREQS.annually">
        <b>{{ $t('yearlyPayment') }}</b>
        <p>
          <template v-if="mutableOnBoarding.paymentType === 1">400</template>
          <template v-if="mutableOnBoarding.paymentType === 2">150</template>
          {{ $t('euro/year') }}
        </p>
      </div>
    </div>
    <small style="text-align: center"> <font-awesome-icon icon="info-circle"/>{{ $t('twoMonthsForFree') }}</small>
    <br>
    <form class="form wizard">
      <div class="form-item">
        <span class="label">{{ $t('iban') }}</span>
        <input class="input-text" type="text" v-model="mutableOnBoarding.payment.iban" name="" id=""/>
        <div>
          <font-awesome-icon class="ibanIcon success" v-if="ibanIsValid" icon="check-circle" />
          <font-awesome-icon class="ibanIcon" v-else icon="times-circle" />
        </div>
      </div>
    </form>

    <div class="wizard-checkbox">
      <input id="checkbox" type="checkbox" name="checkbox" v-model="mutableOnBoarding.sepaAccepted">
      <label for="checkbox">{{ $t('sepaAgreementFormText') }}</label>
    </div>

  </div>
</template>

<script>
import { helpers } from '../../../utils/helper'

const FREQS = {
  monthly: 1,
  annually: 2
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
      loading: false,
      FREQS,
      selected: null,
      mutableOnBoarding: this.onboardingData
    }
  },
  computed: {
    ibanIsValid () {
      return this.validate(this.mutableOnBoarding.payment.iban)
    }
  },
  methods: {
    validate (iban) {
      const isValid = helpers.validateIban(iban)
      this.mutableOnBoarding.ibanIsValid = isValid
      return isValid
    }
  }
}
</script>

<style lang="scss">
@import '/assets/scss/styles.scss';

.onboarding-wizard {
  width: 100%;
  display: flex;
  justify-content: center;
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
      &:hover {
        border: 2px solid $color-orange;
      }
    }
    .selected {
      border: 2px solid $color-orange !important;
    }
  }
  .form-item {
    display: flex;
    width: 30em;
    & .label {
      width: 10em !important;
    }
  }
  .wizard-checkbox {
    margin-bottom: 1em;
  }
  .ibanIcon {
    margin-left: 1em;
    color: grey;
  }
  .success {
    color: green;
  }
  .bankSpacer {
    width: 2.7em;
  }
  .form {
    &.wizard {
      margin: 20px 0;
    }
  }
}

</style>
