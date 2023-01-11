<template>
  <div class="section">

    <form
      class="form"
      @submit.prevent="updateMember"
    >
      <h2>{{ $t('contactDetails') }}</h2>
      <div class="form-item">
        <span class="label">{{ $t('firstName') }}</span>
        <input
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
          v-model="member.address"
          class="input-text"
          type="text"
          name=""
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('zipCode') }}</span>
        <input
          v-model="member.zip"
          class="input-text"
          type="text"
          name=""
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('city') }}</span>
        <input
          v-model="member.city"
          class="input-text"
          type="text"
          name=""
        >
      </div>
      <div class="form-item">
        <span class="label">{{ $t('country') }}</span>
        <select class="input-select" v-model="member.countryCode">
          <option
              v-for="country in countries" :value="country.id" v-bind:key="country.id">
            {{ country.name }}
          </option>
        </select>
      </div>
      <div class="form-item">
        <span class="label">{{ $t('phone') }}</span>
        <input
            id=""
            v-model="member.phone"
            class="input-text"
            type="text"
            name=""
        >
      </div>
      <div class="form-item" v-if="!member.paidForBy">
        <span class="label">Rechnungskontakt</span>
        <div class="checkbox-wrapper" >
          <input id="checkbox" class="checkbox" type="checkbox"
                 :checked="member.hasBillingAddress"
                 v-model="member.hasBillingAddress" >
          <p class="text">weicht von Kontaktaddresse ab</p>
        </div>
      </div>
      <div v-if="member.hasBillingAddress">
        <br>
        <h2>Rechnungskontakt</h2>
        <div class="form-item">
          <span class="label">{{ $t('firstName') }}</span>
          <input class="input-text"  type="text" v-model="member.billingFirstName" name=""/>
        </div>
        <div class="form-item">
          <span class="label">{{ $t('lastName') }}</span>
          <input class="input-text"  type="text" v-model="member.billingLastName" name=""/>
        </div>
        <div class="form-item">
          <span class="label">{{ $t('address') }}</span>
          <input class="input-text" type="text" v-model="member.billingAddress" name=""/>
        </div>
        <div class="form-item">
          <span class="label">{{ $t('zipCode') }}</span>
          <input class="input-text" type="text" v-model="member.billingZip" name=""/>
        </div>
        <div class="form-item">
          <span class="label">{{ $t('city/location') }}</span>
          <input class="input-text" type="text" v-model="member.billingCity" name=""/>
        </div>
        <div class="form-item">
          <span class="label">{{ $t('country') }}</span>
          <select class="input-select" v-model="member.billingCountryCode">
            <option
                v-for="country in countries" :value="country.id" v-bind:key="country.id">
              {{ country.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- WIP -->
<!--      <div v-if="!this.member.paidForBy">-->
<!--        <div class="form-item">-->
<!--          <span class="label">IBAN<span class="red">*</span></span>-->
<!--          <div>-->
<!--            <input class="input-text" style="margin-bottom: 3px" type="text" v-model="this.member.iban" name="" @input="validateIban()"/>-->
<!--            <div class="date-error">-->
<!--            <span-->
<!--                v-if="!this.ibanIsValid && this.member.iban"-->
<!--                class="bad"-->
<!--            >{{ 'IBAN ist üngültig' }} </span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="form-item">-->
<!--          <span class="label" >SEPA MANDAT</span>-->
<!--          <div class="checkbox-wrapper">-->
<!--            <input class="checkbox" type="checkbox"-->
<!--                   :checked="this.sepaMandat"-->
<!--                   v-model="this.sepaMandat" >-->
<!--            <p class="text" style="max-width: 600px">Ich ermächtige die CAP.Future GMBH, Zahlungen von meinem Konto mittels SEPA-Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von der CAP.Future GMBH auf mein Konto gezogenen SEPA-Lastschriften einzulösen. Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <div class="button-row">
        <div v-if="loading">
          Saving…
        </div>
        <button
          v-else
          type="submit"
          :class="['input-button-primary', { disabled: !dataValid }]"
          :disabled="!dataValid"
        >
          <font-awesome-icon icon="save"/> {{ $t('save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
//import { helpers } from '../../utils/helper'

export default {
  middleware: 'authenticated',
  data () {
    return {
      loading: false,
      countries: null
      // WIP
      // iban: '',
      // sepaMandat: false,
      // ibanIsValid: false
    }
  },
  async mounted () {
    this.countries = await this.$store.dispatch('getCountries')
  },
  computed: {
    member () {
      return this.$store.state.member
    },
    dataValid () {
      //check contact fields
      if (this.member) {
        if (this.member.address && this.member.zip && this.member.city && this.member.countryCode) {
          // check optional invoice contact fields
          if (!this.member.hasBillingAddress) {
            return true
          } else {
            if (this.member.billingFirstName && this.member.billingLastName && this.member.billingAddress &&
                this.member.billingCity && this.member.billingZip && this.member.billingCountryCode) {
              return true
            } else {
              return false
            }
          }
        } else {
          return false
        }
      } else return false
    }
  },
  created () {
  },
  methods: {
    // WIP
    // validateIban () {
    //   if (this.member.iban) {
    //     this.ibanIsValid = true
    //     if (helpers.validateIban(this.member.iban)) {
    //       return true
    //     }
    //   }
    //   this.ibanIsValid = false
    //   return false
    // },
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
  form{
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
        margin-top: 4px;
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

  }

</style>
