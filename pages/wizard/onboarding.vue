<template>
  <div
      class="wizard"
  >
    <div class="header">
      <font-awesome-icon
          class="icon"
          icon="user-friends"
      />
      <h2>{{ $t('joinNow') }}</h2>
      <p>{{ $t('becomeAMemberIn4simpleSteps') }}</p>
    </div>
    <div class="wizard-section">
      <div class="wizard-section-menu">
        <div class="steps">
          <div
              :key="i"
              v-for="s,i in steps"
              class="step"
              :class="{ 'icon': index > i, 'color': index >= i}"
          >
            <span
                v-if="!i"
                class="dot"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 230 200"
              ><path
                  d="M20 130l40 40L200 30"
                  stroke-width="25"
                  fill="none"
                  stroke="#FFF"
              /></svg>
            </span>
            <span
                v-else
                class="dot"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 230 200"
              ><path
                  d="M20 130l40 40L200 30"
                  stroke-width="25"
                  fill="none"
                  stroke="#FFF"
              /></svg>
            </span>
          </div>
        </div>
      </div>
      <div class="wizard-section-content">
        <NuxtChild
            :key="$route.params.slug"
            :onboarding-data="onboardingData"
        />
      </div>
      <div class="wizard-section-nav">
        <div class="form">
          <div class="button-row">
            <button
                v-if="activeStep === 'confirmation'"
                class="input-button-primary"
                @click="$router.push('/me/trainings')"
            >
              <font-awesome-icon icon="arrow-circle-right"/> {{ $t('startSafetyTraining') }}
            </button>
            <button
                v-else-if="index > 0"
                class="input-button-primary"
                @click="back()"
            >
              {{ $t('back') }}
            </button>
            <button
                v-if="activeStep !== 'confirmation'"
                :class="['input-button-primary', { disabled: !nextStepDisabled }]"
                :disabled="nextStepDisabled"
                @click="next()"
            >
              {{ activeStep === 'payment' ? 'Anmeldung abschließen' : 'Weiter' }}
            </button>
          </div>
        </div>
        <div v-if="activeStep === 'confirmation'" class="confirmation-footer">
          {{ $t('nextStepsAfterASU') }}
          <br>
          <p style="font-weight: bold">{{ $t('ourOpeningHours') }}
            <br>
            Do und Fr, 14:00 - 20:00 Uhr
            <br>
            Sa, 10:00 - 20:00 Uhr
            <br>
            Feiertags geschlossen
            <br>
          </p>
          {{ $t('weAreLookingForwardToWelcomeYou') }}
        </div>
      </div>
      <p v-if="loadingEmail" >{{this.loadingCheckEmailStatus}}</p>
      <loading-spinner v-if="this.loadingEmail" class="loading-spinner ml-05"/>
    </div>

  </div>
</template>

<script>

const MemberType = {
  member: 1,
  corporate: 2,
  corporate_freeCost: 3
}
export default {
  data () {
    return {
      loading: false,
      loadingEmail: false,
      loadingCheckEmailStatus: '',
      mailCheck: false,
      MemberType,
      steps: ['index', 'userInformation', 'contact', 'image', 'payment', 'confirmation'],
      onboardingData: {
        rulesAccepted: false,
        //image: null,
        image64: null,
        //imageUrl: null,
        userInformation: {
          firstName: null,
          lastName: null,
          gender: null,
          email: null,
          password: null,
          registered: false,
          emailOk: false
        },
        contactInformation: {
          birthdate: null,
          birthdateValid: false,
          name: null,
          address: null,
          zip: null,
          city: null,
          country: null,
          phone: null,
          companyCode: null,
          companyCodeValid: false,
          company: null,
          useContactAsInvoiceInformation: true
        },
        invoiceContactInformation: {
          firstName: null,
          lastName: null,
          address: null,
          zip: null,
          city: null,
          country: null
        },
        payment: {
          iban: null,
          bookStorage: [],
          membership: null,
          sepaMandat: false,
          agb: false,
          privacyPolicy: false,
          ibanIsValid: false
        },
        profile: {
          address: null,
          address2: null,
          city: null,
          zip: null,
          phone: null,
          birthdate: null,
          company: null
        },
        referrer: ''
      },
      invoiceContact: {}
    }
  },
  computed: {
    activeStep () {
      return this.$route.path.split('/')[3] || 'index'
    },
    nextStepDisabled () {
      const data = this.onboardingData
      switch (this.activeStep) {
        case 'index':
          return !(data.rulesAccepted)
        case 'userInformation': {
          //return false
          // eslint-disable-next-line no-unreachable
          const requiredKeys = ['firstName', 'lastName', 'gender', 'email', 'password']
          return ((!!requiredKeys.filter(k => !data.userInformation[k]).length) || !data.userInformation.emailOk)
        }
        case 'contact': {
          //return false
          // eslint-disable-next-line no-unreachable
          const data = this.onboardingData
          const requiredKeys = ['birthdate', 'address', 'zip', 'city', 'country', 'phone']
          const requiredKeysInvoiceContact = ['firstName', 'lastName', 'address', 'zip', 'city', 'country']
          const allInvoiceContactFieldsSet = (!requiredKeysInvoiceContact.filter(k => !data.invoiceContactInformation[k]).length)
          // if another invoice contact (checkbox) is selected, then the additional fields are required to proceed
          if (!data.contactInformation.useContactAsInvoiceInformation && !allInvoiceContactFieldsSet) {
            return true
          }
          return ((!!requiredKeys.filter(k => !data.contactInformation[k]).length || !data.contactInformation.birthdateValid))
        }
        case 'image': {
          return false
        }
        case 'payment': {
          const membershipType = this.getMemberType()
          // if company & free cost
          if (membershipType === MemberType.corporate_freeCost) {
            if (data.payment.agb && data.payment.privacyPolicy) {
              return false
            }
          }
          // if company & no free cost
          if (membershipType === MemberType.corporate) {
            if (data.payment.agb && data.payment.privacyPolicy && data.payment.sepaMandat && data.payment.ibanIsValid) {
              return false
            }
          }
          // if no company member
          if (membershipType === MemberType.member) {
            if (data.payment.agb && data.payment.privacyPolicy && data.payment.sepaMandat && data.payment.ibanIsValid && data.payment.membership) {
              return false
            }
          }
          return true
        }
        case 'done': {
          return data.referrer === ''
        }
        default:
          return false
      }
    },
    index () {
      return this.steps.indexOf(this.activeStep)
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    getData () {
      if (sessionStorage.getItem('onboardingData')) {
        this.onboardingData = JSON.parse(sessionStorage.getItem('onboardingData'))
      }
      const user = this.$store.state.user
      for (const key of Object.keys(this.onboardingData.profile)) {
        if (Object.prototype.hasOwnProperty.call(user, key)) {
          this.onboardingData.profile[key] = user.profile[key]
        }
      }
    },
    // saveUserData () {
    //   this.$store.dispatch('updateUser', Object.assign({}, this.onboardingData.profile))
    // },
    saveOnboardingData () {
      sessionStorage.setItem('onboardingData', JSON.stringify(this.onboardingData))
    },
    back () {
      const ni = this.index - 1 < 0 ? 0 : this.index - 1
      let path = this.steps[ni]
      if (ni === 0) {
        path = ''
      }
      this.$router.push('/wizard/onboarding/' + path)
    },
    async next () {
      switch (this.activeStep) {
        case 'index':
          this.loadNextPage()
          this.saveOnboardingData()
          break
        case 'userInformation':
          this.mailCheck = false
          // will go to next page if email is valid
          await this.checkLoginDataAndProceed()
          this.saveOnboardingData()
          break
        case 'contact':
          console.log('next')
          this.loadNextPage()
          this.saveOnboardingData()
          // only go to next step, if e-mail address is valid
          break
        case 'payment':
          this.saveOnboardingData()
          this.submit()
          this.loadNextPage()
          // only go to next step, if e-mail address is valid
          break
        case 'done':
          break
        default:
          this.saveOnboardingData()
          this.loadNextPage()
      }
    },

    loadNextPage () {
      const ni = this.index + 1 < 0 ? 0 : this.index + 1
      const path = this.steps[ni]
      if (path) {
        this.$router.push('/wizard/onboarding/' + path)
      }
    },
    getMemberType () {
      if (this.onboardingData.contactInformation?.company?.metadata?.attendees_free_cost) {
        return MemberType.corporate_freeCost
      }
      if (this.onboardingData.contactInformation?.company && !this.onboardingData.contactInformation.company?.metadata?.attendees_free_cost) {
        return MemberType.corporate
      } else { return MemberType.member }
    },
    async submit () {
      console.log('submit')
      // basicData = data for the new fabman user, that is needed for any membership type
      const basicData = {
        // required
        //emailAddress: this.onboardingData.userInformation.email,
        address: this.onboardingData.contactInformation.address,
        city: this.onboardingData.contactInformation.city,
        zip: this.onboardingData.contactInformation.zip,
        firstName: this.onboardingData.userInformation.firstName,
        lastName: this.onboardingData.userInformation.lastName,
        // optional
        //region, language,requireUpfrontPayment, state,  not used
        gender: this.onboardingData.userInformation.gender,
        dateOfBirth: this.onboardingData.contactInformation.birthdate,
        // TODO: must be a number?
        phone: this.onboardingData.contactInformation.phone,
        countryCode: this.onboardingData.contactInformation.country,
        hasBillingAddress: this.onboardingData.contactInformation.useContactAsInvoiceInformation
      }
      let memberData = null
      let finalData = null
      switch (this.getMemberType()) {
        case MemberType.corporate_freeCost:
          console.log('MemberType: corporate_freeCost')
          break
        case MemberType.corporate:
          console.log('MemberType: corporate')
          break
        case MemberType.member:
          console.log('MemberType: member')
          memberData = {
            iban: this.onboardingData.payment.iban
          }
          finalData = { ...basicData, ...memberData }
          break
      }
      this.loading = true
      console.log('data: ', finalData)
      await this.$store.dispatch('createMember', finalData)
      this.loading = false
    },
    // check mail

    // sets this.mailCheck to true, if e-mail address is valid for registration
    async checkLoginDataAndProceed () {
      this.loadingEmail = true
      this.loadingCheckEmailStatus = 'Prüfe E-Mail Adresse...'
      const data = {
        email: this.onboardingData.userInformation.email,
        password: this.onboardingData.userInformation.password,
        user_metadata: {
          firstName: this.onboardingData.userInformation.firstName,
          lastName: this.onboardingData.userInformation.lastName
        }
      }
      this.$store.dispatch('checkLoginData', data).then((r) => {
        this.loadingCheckEmailStatus = 'E-Mail Adresse ist verfügbar'
        return new Promise(resolve => {
          setTimeout(() => {
            this.mailCheck = true
            this.loadingEmail = false
            this.loadNextPage()
            this.saveOnboardingData()
          }, 1000)
        })
      })
        .catch((e) => {
          this.loadingEmail = false
          this.mailCheck = false
          const errorMsg = e?.response?.data?.msg
          if (e.error) {
            this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.error + '"'
          }
          if (errorMsg) {
            switch (errorMsg) {
              case 'user_exists':
                this.$toast.show('Ein User mit dieser Email Adresse existiert bereits', {
                  theme: 'bubble'
                })
                break
              default:
                this.$toast.show('Ein Fehler ist aufgetreten: ', e.code, {
                  theme: 'bubble'
                })
                break
            }
            this.mailCheck = false
          }
        }
        )
    }
  }
}
</script>

<style lang="scss" scoped>

.wizard {
  margin: 0 4%;

  & .header {
    margin-top: 1em;

    & .icon {
      font-size: 3em;
    }
  }

  .wizard-section {
    h2 {
      width: 100%;
      margin-top: 1.5em;
      text-align: center;
    }

    & .form {
      margin-top: 1em;
    }

    display: flex;
    align-items: center;
    flex-direction: column;

    .wizard-section-menu {
      .steps {
        .step {
          display: inline-block;
          position: relative;

          &:before {
            z-index: -1;
            content: '';
            position: absolute;
            margin-top: -3px;
            top: 50%;
            right: -10px;
            border-bottom: 6px solid #999;
            width: 50px;
          }

          &.color {
            .dot {
              background-color: $color-orange;
            }
          }

          &.icon {
            .dot {
              svg {
                display: block;
              }
            }

            &:before {
              border-bottom: 6px solid $color-orange;
            }
          }

          .dot {
            height: $step-size;
            width: $step-size;
            display: inline-block;
            border-radius: 50%;
            margin-right: $step-size;
            background-color: #999;

            svg {
              display: none;
              padding: 8px;
              height: 30px;
            }
          }

          &:last-child {
            .dot {
              margin-right: 0;
            }

            &:before {
              display: none;
            }
          }
        }
      }
    }

    .wizard-section-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .wizard-section-nav {
      min-width: 50vh;

      .button-row {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;

        .spacer {
          flex: 1;
        }
      }
    }
  }
  .confirmation-footer {
    display: flex;
    max-width: 1000px;
    text-align: center;
    flex-flow: column;
    @include media-breakpoint-down(sm) {
      max-width: 90%;
      margin-left: 5%;
    }
  }

  .button-row {
    text-align: right;
    .input-button-primary {
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
  }
  .input-button-primary:disabled {
    cursor: default;
    background-color: grey;
    border: 1px solid darkgrey;
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
</style>
