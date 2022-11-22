<!--<script src="../../../utils/helper.js"></script>-->
<template>
  <div class="section">
    <h2>{{ $t('signupMakerSpace') }}</h2>
    <p>{{ $t('beforeYouCanStart') }}</p>
    <form class="form">
      <div v-if="!this.onboardingData.contactInformation.company">
      <div class="form-item" v-for="storage in this.availableStorage" :key="storage.id">
        <span class="label">{{storage.name}}</span>
        <div class="checkbox-wrapper">
          <input class="checkbox" type="checkbox"
                 :id="storage" v-model="onboardingData.payment.bookStorage" :value="storage"
                 @click="setStorage(storage, $event)">
          <p class="text">für {{storage.recurringFee}}€ monatlich buchen</p>
        </div>
      </div>
      </div>
      <div class="form-item" v-if="!this.onboardingData.contactInformation.company">
        <span class="label">MITGLIEDSCHAFT<span class="red">*</span></span>
        <select class="input-select" v-model="onboardingData.payment.membership" @change="setMembershipPrice()">
          <option
              v-for="membership in availableMemberships" :value="membership" v-bind:key="membership.id">
            {{ membership.name }}
          </option>
        </select>
      </div>
      <div class="form-item" v-if="!this.onboardingData.contactInformation.company && this.onboardingData.payment.bookStorage.length > 0">
        <span class="label">LAGER: PREIS<span class="red">*</span></span>
        <p class="text">{{ this.storagePrice }}</p>
<!--        <p class="text">10€</p>-->
<!--        <input class="input-text" type="text" v-model="onboardingData.contactInformation.address" name=""/>-->
      </div>
      <div class="form-item" v-if="this.onboardingData.payment.membership || this.onboardingData.contactInformation.company">
        <span class="label">MITGLIEDSCHAFT: PREIS<span class="red">*</span></span>
        <p class="text">{{ this.price }}</p>
        <!--        <p class="text">10€</p>-->
        <!--        <input class="input-text" type="text" v-model="onboardingData.contactInformation.address" name=""/>-->
      </div>
      <div class="form-item" v-if="this.onboardingData.contactInformation.company">
        <span class="label">FIRMENMITGLIEDSCHAFT<span class="red">*</span></span>
        <span class="text-content">{{ companyInformation }}</span>
<!--        <p class="text">{{ this.companyInformation }}</p>-->
        <!--        <p class="text">10€</p>-->
        <!--        <input class="input-text" type="text" v-model="onboardingData.contactInformation.address" name=""/>-->
      </div>
      <div v-if="!this.hasAttendeesFreeCost">
        <div class="form-item">
          <span class="label">IBAN<span class="red">*</span></span>
          <input class="input-text" type="text" v-model="onboardingData.payment.iban" name=""/>
          <div class="date-error">
          <span
              v-if="!this.isValidIban && this.onboardingData.payment.iban"
              class="bad"
          >{{ 'IBAN ist üngültig' }} </span>
          </div>
        </div>
        <div class="form-item">
          <span class="label">SEPA MANDAT</span>
          <div class="checkbox-wrapper">
            <input class="checkbox" type="checkbox"
                   :checked="onboardingData.payment.sepaMandat"
                   v-model="onboardingData.payment.sepaMandat" >
            <p class="text" style="max-width: 600px">Ich ermächtige die CAP.Future GMBH (Adresse, Kontko), Zahlungen von meinem Konto mittels SEPA-Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von der CAP.Future GMBH auf mein Konto gezogenen SEPA-Lastschriften einzulösen. Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.</p>
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="label">AGB</span>
        <div class="checkbox-wrapper">
          <input class="checkbox" type="checkbox"
                 :checked="onboardingData.payment.agb"
                 v-model="onboardingData.payment.agb" >
<!--          <p class="text">Ich habe die </p>-->
          <label >{{ $t('iHaveReadThe') }} <nuxt-link
              target="_blank"
              to="/de/agb"
          >{{ $t('conditionsOfParticipation') }} </nuxt-link> {{ $t('andAcceptTheTermsAndConditions') }}</label>
<!--          <p class="text"> gelesen und bin damit einverstanden.</p>-->
        </div>
      </div>
      <div class="form-item">
        <span class="label">DATENSCHUTZERKLÄRUNG</span>
        <div class="checkbox-wrapper">
          <input class="checkbox" type="checkbox"
                 :checked="onboardingData.payment.privacyPolicy"
                 v-model="onboardingData.payment.privacyPolicy" >
          <label>{{ $t('iHaveReadThe') }} <nuxt-link
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

const FREQS = {
  monthly: 1,
  annually: 2
}
export default {
  //middleware: 'authenticated',
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
      FREQS,
      selected: null,
      mutableOnBoarding: this.onboardingData
    }
  },
  mounted () {
    // this.$refs.firstInput.focus()
    this.$store.dispatch('getCountries').then((r) => (this.countries = r))
    //all packages available for booking
    this.$store.dispatch('getPackages').then((r) => {
      this.packages = r
      // filter already booked storages
      this.availableStorage = this.packages.filter((p) => {
        // for (const s of this.memberStorage) {
        //   if (s.package === p.id) {
        //     return false
        //   }
        // }
        //handle packages with no notes available for storage & visibility or malformed format
        //const notes = null
        if (!p.notes) {
          console.error('no notes (storage, visible) for package: ', p)
          return false
        }
        // try {
        //   notes = JSON.parse(p.notes)
        // } catch (err) {
        //   console.error('malformed json format: ', p.notes)
        // }
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
  computed: {
    storagePrice () {
      //console.log('bookStorage: ', this.onboardingData.payment.bookStorage.length)
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
      console.log('Kosten werden übernommen: ', this.onboardingData.contactInformation.company?.metadata?.attendees_free_cost)
      const information = 'Firmenabo von: ' + this.onboardingData.contactInformation.company?.lastName + ' wird eingelöst.'
      return information
    },
    hasAttendeesFreeCost () {
      return this.onboardingData?.contactInformation?.company?.metadata?.attendees_free_cost
    },
    isValidIban () {
      if (this.onboardingData?.payment?.iban) {
        console.log('isValid: ', helpers.validateIban(this.onboardingData?.payment?.iban))
        return helpers.validateIban(this.onboardingData?.payment?.iban)
      }
      return false
    }
  },

  methods: {

    setStorage (storage, event) {
      //console.log('price changes: ', storage.id)
      // if (event.target.checked) {
      //   console.log('event: ', event)
      //   if (!this.onboardingData.payment.bookStorage.includes(storage.id)) {
      //     this.onboardingData.payment.bookStorage.push(storage.id)
      //   }
      //   //this.onboardingData.payment.bookStorage.push(storage.id)
      // } else {
      //   this.onboardingData.payment.bookStorage.splice(this.onboardingData.payment.bookStorage.findIndex(function (i) {
      //     return i.id === storage.id
      //   }), 1)
      // }
      //console.log('storage: ', this.onboardingData.payment.bookStorage)
      // console.log('membership: ', this.onboardingData.payment.membership)
      // console.log('storage: ', this.onboardingData.payment.bookStorage)

      // for (const storage in this.onboardingData.payment.bookStorage) {
      //   console.log('storage: ', this.onboardingData.payment.bookStorage)
      //   console.log('storage id: ', storage)
      //   //console.log('get all storage objects: ', this.availableStorage.find(s => s.id === storage).name)
      // }
      // console.log('get storage obj: ', this.availableStorage.find(storage => storage.id === 4959).name)
      // console.log('this.onboardingData.payment.bookStorage: ', this.onboardingData.payment.bookStorage)
    },
    setMembershipPrice () {
      if (this.onboardingData.payment.membership) {
        //console.log('membership: ', this.onboardingData.payment.membership)
      }

      this.membershipPrice = 0
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
  //min-width: 27em;
  //@include media-breakpoint-down(md) {
  //  min-width: auto;
  //}
  //padding: 0 0 5px;
  //@include media-breakpoint-up(sm) {
  //  padding: 0 0 18px;
  //  display: grid;
  //  grid-template-columns: 28% 72%;
  //}
  //align-items: center;
  //.label {
  //  font-weight: bold;
  //  text-transform: uppercase;
  //  font-size: .7em;
  //}
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

    margin-top: 4px;
    margin-right: 0;
    display: flex;
    .checkbox {
      max-width: 30px;
      width: 30px;
      min-width: 30px;
      max-height: 15px;
      height: 15px;
      min-height: 15px;
    }
    .text {
      margin: 0;
      margin-top: 4px;
      //max-width: 100px;
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
