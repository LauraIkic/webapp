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
            <!--            <NuxtLink class="dot" v-if="i == 0" to="/wizard/onboarding/">-->
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
            <!--            </NuxtLink>-->
            <!--            <NuxtLink class="dot" v-else :to="'/wizard/onboarding/' + s">-->
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
            <!--            </NuxtLink>-->
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
<!--      <div-->
<!--          v-if="errorMessage"-->
<!--          class="form-item error-message"-->
<!--      >-->
<!--        <span />-->
<!--        <div>-->
<!--          <span>{{ errorMessage }}</span>-->
<!--          <markdown-->
<!--              v-if="errorDescription"-->
<!--              class="policy"-->
<!--              :value="errorDescription"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>

export default {
  //middleware: 'authenticated',
  data () {
    return {
      loading: false,
      mailCheck: false,
      // errorMessage: null,
      // errorDescription: '',
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
          privacyPolicy: false
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
          return false
          // eslint-disable-next-line no-unreachable
          const requiredKeys = ['firstName', 'lastName', 'gender', 'email', 'password']
          return ((!!requiredKeys.filter(k => !data.userInformation[k]).length) || !data.userInformation.emailOk)
        }
        case 'contact': {
          return false
          // eslint-disable-next-line no-unreachable
          const data = this.onboardingData
          console.log('data: ', data)
          const requiredKeys = ['birthdate', 'address', 'zip', 'city', 'country', 'phone']
          const requiredKeysInvoiceContact = ['firstName', 'lastName', 'address', 'zip', 'city', 'country']
          const allInvoiceContactFieldsSet = (!requiredKeysInvoiceContact.filter(k => !data.invoiceContactInformation[k]).length)
          // console.log('requiredKeysInvoiceContact.filter(k => !data.invoiceContactInformation[k]): ', requiredKeysInvoiceContact.filter(k => !data.invoiceContactInformation[k]).length)
          // console.log('allInvoiceContactFieldsSet: ', allInvoiceContactFieldsSet)
          // console.log('data.contactInformation.useContactAsInvoiceInformation : ', data.contactInformation.useContactAsInvoiceInformation)
          // if another invoice contact (checkbox) is selected, then the additional fields are required to proceed

          if (!data.contactInformation.useContactAsInvoiceInformation && !allInvoiceContactFieldsSet) {
            return true
          }
          return ((!!requiredKeys.filter(k => !data.contactInformation[k]).length || !data.contactInformation.birthdateValid))
        }
        case 'image': {
          return false
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
  created () {
    // todo check if needed
    //this.getData()
  },
  methods: {
    // loadUserData () {
    //   this.loading = true
    //   this.$store.dispatch('getUserMetadata')
    //     .then((data) => {
    //       this.invoiceContact = data.data.invoice_contact
    //     })
    //     .catch((error) => {
    //       console.log(error.response.status, error.response.data.msg)
    //       this.$toast.show('Ein Fehler ist aufgetreten', {
    //         theme: 'bubble'
    //       })
    //     })
    //     .finally(() => {
    //       this.loading = false
    //     })
    // },
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
    saveUserData () {
      this.$store.dispatch('updateUser', Object.assign({}, this.onboardingData.profile))
    },
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
          await this.checkLoginData()
          // only go to next step, if e-mail address is valid
          if (this.mailCheck) {
            this.loadNextPage()
            this.saveOnboardingData()
          }
          break
        case 'contact':
          console.log('next')
          this.loadNextPage()
          this.saveOnboardingData()
          //await this.checkLoginData()
          // only go to next step, if e-mail address is valid
          break
        case 'payment':
          console.log('submit')
          // this.loadNextPage()
          // this.saveOnboardingData()
          //await this.checkLoginData()
          // only go to next step, if e-mail address is valid
          break
        case 'done':
          this.send()
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
        console.log('loadNextPage: ', path)
        this.$router.push('/wizard/onboarding/' + path)
      }
    },
    async send () {
      this.loading = true
      await this.$store.dispatch('startOnboarding', this.onboardingData)
      this.loading = false
    },
    // check mail

    // sets this.mailCheck to true, if e-mail address is valid for registration
    async checkLoginData () {
      console.log('checkLoginData')
      this.loading = true
      const data = {
        email: this.onboardingData.userInformation.email,
        password: this.onboardingData.userInformation.password,
        user_metadata: {
          firstName: this.onboardingData.userInformation.firstName,
          lastName: this.onboardingData.userInformation.lastName
        }
      }
      return this.$store.dispatch('checkLoginData', data).then((r) => {
        this.mailCheck = true
        this.loading = false
      }).catch((e) => {
        this.loading = false
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
