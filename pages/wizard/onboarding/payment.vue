<template>
  <div class="section">
    <form class="form">
      <div class="form-item" v-if="!this.onboardingData.contactInformation.company" style="margin-top: 40px">
        <span class="label">MITGLIEDSCHAFT<span class="red">*</span></span>
        <select class="input-select" v-model="onboardingData.payment.membership">
          <option
              v-for="membership in availableMemberships" :value="membership" v-bind:key="membership.id">
            {{ membership.name }}
          </option>
        </select>
      </div>
<!--      Verkauf von Lagerboxen wurde temporär ausgesetzt: https://grandgarage.atlassian.net/browse/HP-212-->
<!--      <div v-if="!this.onboardingData.contactInformation.company" style="margin-top: 40px; margin-bottom: 40px">-->
<!--        <div class="form-item" >-->
<!--          <label ></label>-->
<!--          <h5 style="margin: 0">Zusätzlich kannst du deine Projekte in einer unserer Lagerboxen aufbewahren.</h5>-->
<!--        </div>-->
<!--      <div class="form-item" v-for="storage in this.availableStorage" :key="storage.id" style="margin: 0">-->
<!--        <span class="label">{{storage.name}}</span>-->
<!--        <div class="checkbox-wrapper">-->
<!--          <input class="checkbox" type="checkbox"-->
<!--                 :id="storage" v-model="onboardingData.payment.bookStorage" :value="storage">-->
<!--          <p class="text">für {{storage.recurringFee}}€ monatlich buchen</p>-->
<!--        </div>-->
<!--      </div>-->
<!--      </div>-->
      <div class="form-item" v-if="!this.onboardingData.contactInformation.company && this.onboardingData.payment.bookStorage.length > 0">
        <span class="label">LAGER: PREIS<span class="red">*</span></span>
        <p class="text">{{ this.storagePrice }} (inkl. MwSt)</p>
      </div>
      <div class="form-item" v-if="this.onboardingData.payment.membership || this.onboardingData.contactInformation.company">
        <span class="label">MITGLIEDSCHAFT: PREIS<span class="red">*</span></span>
        <p class="text">{{ this.price }} (inkl. MwSt)</p>
      </div>
      <div class="form-item" v-if="this.onboardingData.contactInformation.company">
        <span class="label">FIRMENMITGLIEDSCHAFT<span class="red">*</span></span>
        <span class="text-content">{{ companyInformation }}</span>
      </div>
      <div v-if="!this.hasAttendeesFreeCost">
        <div class="form-item">
          <span class="label">IBAN<span class="red">*</span></span>
            <div>
            <input class="input-text" style="margin-bottom: 3px" type="text" v-model="onboardingData.payment.iban" name="" @input="validateIban()"/>
            <div class="date-error">
            <span
                v-if="!this.onboardingData.payment.ibanIsValid && this.onboardingData.payment.iban"
                class="bad"
            >{{ 'IBAN ist üngültig' }} </span>
            </div>
          </div>
        </div>
        <div class="form-item">
          <span class="label">{{ 'Kontoinhaber*in' }}<span class="red">*</span></span>
          <input class="input-text" type="text" v-model="onboardingData.payment.accountOwner"/>
        </div>
        <div class="form-item">
          <span class="label" >KontoinhaberIn volljährig?</span>
          <div class="checkbox-wrapper">
            <input class="checkbox" type="checkbox"
                   :checked="onboardingData.payment.accountOwnerLegalAge"
                   v-model="onboardingData.payment.accountOwnerLegalAge" >
            <p class="text" style="max-width: 600px">Hiermit bestätige, dass der/die KontoinhaberIn volljährig ist.</p>
          </div>
        </div>
        <div class="form-item">
          <span class="label" >SEPA MANDAT</span>
          <div class="checkbox-wrapper">
            <input class="checkbox" type="checkbox"
                   :checked="onboardingData.payment.sepaMandat"
                   v-model="onboardingData.payment.sepaMandat" >
            <p class="text" style="max-width: 600px">Ich ermächtige die CAP.future GMBH, Zahlungen von meinem Konto mittels SEPA-Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von der CAP.Future GMBH auf mein Konto gezogenen SEPA-Lastschriften einzulösen. Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.</p>
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="label">AGB</span>
        <div class="checkbox-wrapper">
          <input class="checkbox" type="checkbox"
                 :checked="onboardingData.payment.agb"
                 v-model="onboardingData.payment.agb" >
          <label class="text-content" >{{ $t('iHaveReadThe') }} <nuxt-link
              target="_blank"
              to="/de/agb"
          >{{ $t('conditionsOfParticipation') }} </nuxt-link> {{ $t('andAcceptTheTermsAndConditions') }}</label>
        </div>
      </div>
      <div class="form-item">
        <span class="label">DATENSCHUTZERKLÄRUNG</span>
        <div class="checkbox-wrapper">
          <input class="checkbox" type="checkbox"
                 :checked="onboardingData.payment.privacyPolicy"
                 v-model="onboardingData.payment.privacyPolicy" >
          <label class="text-content">{{ $t('iHaveReadThe') }} <nuxt-link
              target="_blank"
              to="/de/datenschutzerklaerung"
          >{{ $t('dataPrivacyPolicy') }}</nuxt-link> {{ $t('andAcceptTheTermsAndConditions') }}</label>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
import { helpers } from '../../../utils/helper'

export default {
  props: {
    onboardingData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      countries: null,
      packages: [],
      availableStorage: [],
      availableMemberships: [],
      MembershipPrice: null,
      selected: null,
      mutableOnBoarding: this.onboardingData
    }
  },
  mounted () {
    // this.$refs.firstInput.focus()
    window.scrollTo(0, 0)
    this.$store.dispatch('getCountries').then((r) => (this.countries = r))
    //all packages available for booking
    this.$store.dispatch('getPackages').then((r) => {
      this.packages = r
      // filter already booked storages
      this.availableStorage = this.packages.filter((p) => {
        //handle packages with no notes available for storage & visibility or malformed format
        if (!p.notes) {
          console.error('no notes (storage, visible) for package: ', p)
          return false
        }
        if (!p.notes) {
          return false
        }
        if (!p.notes.is_storage_box && p.notes.shop_visible) {
          this.availableMemberships.push(p)
        }
        return p.notes.is_storage_box && p.notes.shop_visible
      }
      )
    })
  },
  beforeRouteEnter (to, from, next) {
    //console.log('PAYMENT FROM: ', from.path)
    if ((from.path === '/wizard/onboarding/image')) {
      next()
    } else {
      next('/wizard/onboarding/userInformation')
    }
  },
  computed: {
    storagePrice () {
      let storagePrice = 0.00
      let selectedStorages = []
      selectedStorages = JSON.parse(JSON.stringify(this.onboardingData.payment.bookStorage))
      selectedStorages.forEach(storage => {
        storagePrice += parseFloat(storage.recurringFee)
      })
      return (storagePrice.toFixed(2) + '€ mntl.')
    },
    ibanIsValid () {
      return this.validate(this.mutableOnBoarding.payment.iban)
    },
    price () {
      if (this.hasAttendeesFreeCost) {
        return 'Alle Kosten werden übernommen'
      } else if (this.onboardingData.contactInformation?.company) {
        return 'Mitgliedschaftskosten werden übernommen'
      } else if (this.onboardingData.payment?.membership) {
        return this.onboardingData.payment.membership.recurringFee + '€'
      }
      return 0
    },
    companyInformation () {
      //console.log('Kosten werden übernommen: ', this.onboardingData.contactInformation.company?.metadata?.attendees_free_cost)
      const information = 'Firmenabo von: ' + this.onboardingData.contactInformation.company?.lastName + ' wird eingelöst.'
      return information
    },
    hasAttendeesFreeCost () {
      return this.onboardingData?.contactInformation?.company?.metadata?.attendees_free_cost
    }
  },

  methods: {
    validateIban () {
      if (this.onboardingData?.payment?.iban) {
        this.onboardingData.payment.ibanIsValid = true
        if (helpers.validateIban(this.onboardingData?.payment?.iban)) {
          return true
        }
      }
      this.onboardingData.payment.ibanIsValid = false
      return false
    }
  }
}
</script>

<style lang="scss" scoped>

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
  .text {
    margin: 0;
    margin-top: 4px;
    //max-width: 100px;
    font-weight: lighter;
    text-transform: none;
    font-size: 1.0em;
  }
  .checkbox-wrapper {
    padding-right: 20px;
    margin-right: 0;
    //margin-bottom: 0;
    display: flex;
    .checkbox {
      //display: flex;
      //justify-content: center;
      //align-items: center;
      //vertical-align: middle;
      //line-height: normal;
      max-width: 15px;
      max-height: 15px;
      margin-right: 5px;
    }
    .text {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      font-weight: lighter;
      text-transform: none;
      font-size: .7em;

    }
  }
  input {
    outline: none;
    flex-grow: 1;
    padding: 5px 10px;
    @include media-breakpoint-down(xs) {
      margin: 1vh 0;
    }
    background: #fff;
    border: 1px solid #fff;
    width: 100%;
    &:focus {
      border-color: $color-orange;
    }
  }
  .label {
    font-weight: bold;
    text-transform: uppercase;
    font-size: .7em;
    //display: flex;
    justify-content: end;
    //align-self: flex-end;
  }
  .text-content {
    align-self: flex-end;
    font-weight: lighter;
    text-transform: none;
    font-size: .7em;

  }
  input {
    display: flex;
    outline: none;
    flex-grow: 1;
    padding: 5px 10px;
    @include media-breakpoint-down(xs) {
      margin: 1vh 0;
    }
    background: #fff;
    border: 1px solid #fff;
    width: 100%;
    &:focus {
      border-color: $color-orange;
    }
  }
  .password-wrapper {
    position: relative;
    .password-status {
      position: absolute;
      right: 10px;
      top: 50%;
      background-color: $color-orange;
      height: .5em;
      width: .5em;
      padding: 0;
      margin-top: -.25em;
      border-radius: 50%
    }
  }
  .date-error {
    grid-column: 2;
  }
  .button-row {
    grid-column: 2;
    margin-bottom: 5px; // fix for some strange ios safari error
    .input-button-primary {
      align-self: flex-end;
      cursor: pointer;
      background-color: $color-orange;
      color: #FFF;
      min-width: 30%;
      border: 1px solid lighten($color-orange, 10);
      padding: 7px 12px 8px;
      line-height: 1;
      outline: none;
      //&:focus {
      //  background-color: $color-orange;
      //}
    }
    .input-button-primary:disabled {
      cursor: default;
      background-color: grey;
      border: 1px solid darkgrey;
    }
  }

  .bad {
    color: $color-orange;
    font-size: .7em;
    font-weight: bold;
  }
}

.disclaimer {
  color: #333;
  a {
    color: $color-orange;
    padding: 0 3px;
  }
}
.error-message {
  color: red;
  .policy {
    font-size: 0.8em;
    color: #333;
    > ul {
      list-style-type: circle;
      padding: 0 0 0 1em;
      > li {
        margin: .4em 0 0 0;
        > ul {
          padding: 0 0 0 1em;
          list-style-type: circle;
          > li {
            margin: .4em 0 0 0;
          }
        }
      }
    }
  }
}

.red {
  border-color: red !important;
}
</style>
