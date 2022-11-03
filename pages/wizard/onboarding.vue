<template>
  <div
      v-if="user !== null"
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
              {{ activeStep === 'done' ? 'Anmeldung abschließen' : 'Weiter' }}
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
  middleware: 'authenticated',
  data () {
    return {
      loading: false,
      // errorMessage: null,
      // errorDescription: '',
      steps: ['index', 'userInformation', 'contact', 'image', 'done', 'confirmation'],
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
          const requiredKeys = ['firstName', 'lastName', 'gender', 'email', 'password']
          return ((!!requiredKeys.filter(k => !data.userInformation[k]).length) || !data.userInformation.emailOk)
        }
        case 'contact': {
          const requiredKeys = ['address', 'city', 'zip', 'phone', 'birthdate']
          return !!requiredKeys.filter(k => !data.profile[k]).length
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
    this.getData()
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
    next () {
      if (this.activeStep === 'userInformation') {
        console.log('check pwd')
        this.submit()
      } else {
        if (this.activeStep === 'done') {
          this.send()
          // sessionStorage.removeItem('onboarding')
        } else {
          this.saveOnboardingData()
        }
        const ni = this.index + 1 < 0 ? 0 : this.index + 1
        const path = this.steps[ni]
        if (path === 'payment') {
          this.saveUserData()
        }
        this.$router.push('/wizard/onboarding/' + path)
      }
    },

    async send () {
      this.loading = true
      await this.$store.dispatch('startOnboarding', this.onboardingData)
      this.loading = false
    },
    // check mail
    submit () {
      this.loading = true
      const data = {
        email: this.onboardingData.userInformation.email,
        password: this.onboardingData.userInformation.password,
        user_metadata: {
          firstName: this.onboardingData.userInformation.firstName,
          lastName: this.onboardingData.userInformation.lastName
          // address: this.address,
          // city: this.city,
          // zip: this.zip
        }
      }
      this.$store.dispatch('registerUser', data).then((r) => {
        this.loading = false
        //this.$store.dispatch('setSidebar', 'register-success')
      }).catch((e) => {
        this.loading = false
        if (e.error) {
          this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.error + '"'
          return
        }
        if (e.code) {
          switch (e.code) {
            case 'user_exists':
              this.$toast.show('Ein User mit dieser Email Adresse existiert bereits', {
                theme: 'bubble'
              })
              //this.errorMessage = 'Ein User mit dieser Email Adresse existiert bereits'
              break
            case 'invalid_password':
              // this.errorMessage = 'Das Passwort ist zu schwach.'
              // this.errorDescription = e.policy
              console.log('show toast')
              this.$toast.show('Das Passwort ist zu schwach: ' + e.policy, {
                theme: 'bubble'
              })
              break
            default:
              this.$toast.show('Ein Fehler ist aufgetreten: ', e.code, {
                theme: 'bubble'
              })
              //this.errorMessage = 'Ein Fehler ist aufgetreten: "' + e.code + '"'
              break
          }
        }
      })
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
