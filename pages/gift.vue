<template href="http://www.w3.org/1999/html">
  <div>
    <span class="flex-center" style="margin-top: 2em;">
      <h2 v-if="action" class="headline">
        Gutschein {{ action === 'buy' ? 'kaufen' : 'einlösen' }}
      </h2>
      <h2 v-else class="headline">
        Gutscheine
      </h2>
      <loading-spinner
        v-if="loading"
        color="#333"
        style="margin-left: 0.5em;"
      />
    </span>
    <template v-if="!action">
      <selection class="items">
        <section class="display-item">
          <div class="top">
            <div class="buy-image"></div>
          </div>
          <div class="bottom">
            <div class="buy-redeem-button"
                 @click="$router.push('gift?action=buy')">
              Gutschein kaufen
            </div>
          </div>
        </section>
        <div class="spacer"></div>
        <br>
        <section class="display-item">
          <div class="top">
            <div class="redeem-image"></div>
          </div>
          <div class="bottom">
            <div class="buy-redeem-button"
                 @click="$router.push('gift?action=redeem')">
              Gutschein einlösen
            </div>
          </div>
        </section>
        <br>
      </selection>
    </template>

    <transition name="fade">
      <template>
        <template v-if="action === 'buy'">
          <div v-if="step === 0" class="giftcardForm">
            <section class="buy-gift-cards">
              <div class="input gg-card" @click="selectedProductId='719'">
                <input type="radio" value="719" v-model="selectedProductId">
                <span> Gutschein-Wert: </span>
                <div class="bottom-gift-card">
                  <option class="options" value="719">10€</option>
                  <div class="image-spacer"></div>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="40">
                  </div>
                </div>
              </div>
              <div class="input gg-card" @click="selectedProductId='720'">
                <input type="radio" value="720" v-model="selectedProductId">
                <span> Gutschein-Wert: </span>
                <div class="bottom-gift-card">
                  <option class="options" value="720">25€</option>
                  <div class="image-spacer"></div>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="40">
                  </div>
                </div>
              </div>
              <div class="input gg-card" @click="selectedProductId='721'">
                <input type="radio" value="721" v-model="selectedProductId">
                <span> Gutschein-Wert: </span>
                <div class="bottom-gift-card">
                  <option class="options" value="721">50€</option>
                  <div class="image-spacer"></div>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="40">
                  </div>
                </div>
              </div>
              <div class="input gg-card" @click="selectedProductId='722'">
                <input type="radio" value="722" v-model="selectedProductId">
                <span> Gutschein-Wert: </span>
                <div class="bottom-gift-card">
                  <option class="options" value="722">100€</option>
                  <div class="image-spacer"></div>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="40">
                  </div>
                </div>
              </div>
            </section>
            <div class="buttons">
              <button
                class="input-button-primary"
                :disabled="!selectedProductId"
                @click="step++"
              >
                Weiter
              </button>
            </div>
          </div>
          <div v-if="step === 1">
            <h2 class="headline">Zahlungsmethode</h2>
            <div class="logged-out-payment">
              <div class="input gg-card" @click="paymentMethod='1'">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  name="paymentMethod"
                  value="1"
                >Kreditkarte
              </div>
            </div>
            <div v-if="user !== null" class="logged-in-payment">
              <div class="spacer"></div>
              <div class="input gg-card" @click="paymentMethod='2'">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  name="paymentMethod"
                  value="2"
                >SEPA-Monatsrechnung
              </div>
              <br>
              <h4>Rechnungsadresse</h4>
              <div class="user-contact">
                <table>
                  <tr>
                    <th>
                      <span class="label">Vorname</span>
                    </th>
                    <th>
                      <input
                        v-model="user.profile.firstName"
                        class="input-text"
                        type="text"
                        name=""
                      >
                    </th>
                  </tr>
                  <th>
                    <span class="label">Nachname</span>
                  </th>
                  <th>
                    <input
                      v-model="user.profile.lastName"
                      class="input-text"
                      type="text"
                      name=""
                    >
                  </th>
                  <tr>
                    <th>
                      <span class="label">E-mail</span>
                    </th>
                    <th>
                      <input
                        v-model="user.profile.emailAddress"
                        class="input-text"
                        type="text"
                        name=""
                      >
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <span class="label">Adresse</span>
                    </th>
                    <th>
                      <input
                        v-model="user.profile.address"
                        class="input-text"
                        type="text"
                        name=""
                      >
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <span class="label"/>
                    </th>
                    <th>
                      <input
                        v-model="user.profile.address2"
                        class="input-text"
                        type="text"
                        name=""
                      >
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <span class="label">PLZ</span>
                    </th>
                    <th>
                      <input
                        v-model="user.profile.zip"
                        class="input-text"
                        type="text"
                        name=""
                      >
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <span class="label">Stadt</span>
                    </th>
                    <th>
                      <input
                        v-model="user.profile.city"
                        class="input-text"
                        type="text"
                        name=""
                      >
                    </th>
                  </tr>
                </table>
              </div>
            </div>
            <div class="buttons">
              <button
                class="input-button-primary"
                @click="step--"
              >
                Zurück
              </button>
              <button
                class="input-button-primary"
                :disabled="!paymentMethod"
                @click="step++"
              >
                Bestellung prüfen
              </button>
            </div>
          </div>
          <!--          </div>-->
          <div v-if="step === 2">
            <div class="headline">
              <h2> Bestätigung:</h2>
              <ul>
                <li>Gutschein {{ getGiftCardValue(selectedProductId) }}€</li>
              </ul>
            </div>
            <div class="buttons">
              <button
                class="input-button-payment"
                @click="step--"
              >
                Zurück
              </button>
              <button
                class="input-button-payment"
                :disabled="!paymentMethod || loading"
                @click="redirectToPayrexxCheckout()"
              >
                Kostenpflichtig bestellen
              </button>
            </div>
          </div>
          <div v-if="step === 3">
            Kauf abgeschlossen. Die Rechnung und deinen Gutschein erhältst du per
            Mail.
          </div>
        </template>

        <template v-if="action === 'redeem'">
          <div
            v-if="step === 0"
            class="giftcardForm"
          >
            <div class="card">
              <div class="input-redeem-card">
              <span class="span">
                Gutschein</span>
                <div class="redeem-card-bottom">
                  <div class=" code">
                    <span class="code-span"> Code: </span>
                    <input
                      v-model="giftCardCode"
                      class="form-item"
                    >
                  </div>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="50">
                  </div>
                </div>
              </div>
              <div v-if="user==null">Bitte logge dich ein um deinen Gutschein einlösen zu könnnen!</div>
              <br>
              <div v-if="user==null">Solltest du noch kein Member sein kannst du dich jetzt unverbindlich auf unserer
                Webseite registrieren!
              </div>
              <br>
            </div>
            <div class="buttons">
              <button
                class="input-button-payment"
                :disabled="!giftCardCode && user == null"
                @click="redeem"
              >
                Einlösen
              </button>
            </div>
          </div>
        </template>
      </template>
    </transition>
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  mixins: [storyblokLivePreview],
  asyncData (context) {
    const path = '/members/shop'
    return context.store.dispatch('loadPage', path).catch((e) => {
      context.error({
        statusCode: e.response.status,
        message: e.response.statusText
      })
    })
  },
  data () {
    return {
      step: 0,
      action: null,
      origin: null,
      selectedProductId: null,
      giftCardCode: null,
      paymentMethod: 0,
      error: '',
      shippingAddressEnabled: 0,
      invoiceContact: null,
      sepa_active: false,
      shippingAddress: [],
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    '$route.query' (to) {
      this.getQuery(to)
    }
  },
  mounted () {
    this.$store.dispatch('getUser').then((data) => {
      this.profile = data.profile
      // eslint-disable-next-line no-undef
    })
    this.getQuery(this.$route.query)
    if (this.user != null) {
      this.$store.dispatch('getUserMetadata').then((data) => {
        console.log('userMetaData', data)
        this.invoiceContact = data.data.invoice_contact
        this.sepaActive = data.data.sepa_active
      })
      this.getQuery(this.$route.query)
    }
  },
  methods: {
    getQuery (to) {
      // eslint-disable-next-line no-prototype-builtins
      if (to.hasOwnProperty('origin')) {
        this.origin = to.origin
      }
      // eslint-disable-next-line no-prototype-builtins
      if (to.hasOwnProperty('action') && ['buy', 'redeem'].includes(to.action)) {
        this.action = to.action
        this.step = 0
        return
      }
      this.action = null
    },
    async redeem () {
      this.loading = true
      const response = await this.$store.dispatch('redeemGiftCard', {
        uuid: this.giftCardCode
      })
      if (!response.success) {
        if (response.already_redeemed) {
          this.$toast.show('Dieser Gutschein ist bereits eingelöst worden!', {
            className: 'badToast'
          })
          this.giftCardCode = ''
          this.loading = false
          return
        }
        if (response.invalid_code) {
          this.$toast.show('Kein Gutschein mit diesem Code gefunden.', {
            className: 'badToast'
          })
          this.loading = false
          return
        }
      }
      if (this.origin) {
        this.$router.push(`buyWorkshop?uuid=${this.origin}`)
        return
      }
      this.loading = false
      this.$toast.show('Der Gutschein wurde erfolgreich eingelöst!', {
        className: 'goodToast'
      })
      this.$router.push('credits')
    },
    redirectToPayrexxCheckout () {
      this.loading = true
      const data = {
        payment_method: parseInt(this.paymentMethod),
        product_id: this.selectedProductId,
        count: 1
      }

      this.$store.dispatch('startTransaction', data)
        .then((response) => {
          if (response.data.redirect_link) {
            // Redirect to payrexx screen
            window.location.href = response.data.redirect_link
          } else {
            console.log('response', response.data)
          }
        })
        .catch((error) => {
          console.log('error', error.data)
          this.$sentry.captureException(new Error(error))
          this.$toast.show('Ein Fehler ist aufgetreten', {
            theme: 'bubble'
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    getGiftCardValue (id) {
      switch (id) {
        case '719':
          return 10
        case '720':
          return 25
        case '721':
          return 50
        case '722':
          return 100
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';

.flex-center {
  display: flex;
  align-items: center;
}

.headline {
  padding-left: 21vw;
}

.items {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (max-width: 799px) {
    flex-direction: column;
    justify-content: space-between;
  }
}

.image-spacer {
  background-size: cover;
  width: 3em;
  position: relative;
}

.spacer {
  width: 2em;
  height: 2vh;
}

.display-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 17em;
  height: 19em;
  position: relative;
  border: 1px solid black;

  .top {
    height: 14em;

    .buy-image {
      background-image: url(~assets/img/buy-giftcard.png);
      height: 14em;
    }

    .redeem-image {
      background-image: url(~assets/img/redeem-giftcard.png);
      height: 14em;
    }
  }

  .bottom {
    height: 5em;
    width: 100%;
  }

  @media screen and (max-width: 799px) {
    background: white;
    border-radius: 0.8em;
    width: 75vw;
    height: 18vh;
    .top {
      align-self: end;
      height: 100%;
      width: 60%;

      .buy-image {
        background-image: url(~assets/img/buy-giftcard-mobile.png);
        height: 17.7vh;
        border-radius: 0.8em;
      }

      .redeem-image {
        background: none;
        height: 17.7vh;
        border-radius: 0.8em;
      }
    }

    .bottom {
      background: none;
      position: absolute;
      width: 40%;
      height: 100%;
      padding-top: 8vh;
      padding-left: 5vw;
    }
  }
}

.buy-redeem-button {
  cursor: pointer;
  width: 100%;
  background: black;
  color: white;
  height: 5.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-family: $font-mono;
  @media screen and (max-width: 799px) {
    height: 3rem;
    border-radius: 0.8em;
    padding: 10px;
    font-size: 1em;
    background: $color-orange;
    font-family: "IBM Plex Sans Condensed", sans-serif;
  }
}

.display-item:hover .buy-redeem-button {
  border-top: 1px solid white;
  background: $color-orange;
}

.buy-gift-cards {
  position: relative;
  display: flex;
  align-items: center;
  flex-flow: wrap;
  justify-content: space-between;
  padding-left: 11vw;
  padding-right: 11vw;

  .bottom-gift-card {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-left: 3vw;
    padding-top: 0.5vh;
  }

  .headline {
    padding-left: 15vw;
    margin-top: 2em;
  }
}

.input {
  background-color: white;
  margin: 1em 0;
  padding-top: 1.5vh;
  padding-bottom: 2vh;
  padding-left: 1.5vw;
  padding-right: 3vw;
  border: 1px solid grey;
  border-radius: 0.3em;
  font-size: 24px;
  width: 30vw;
  @include media-breakpoint-down(sm) {
    width: 80vw;
  }
}

.image {
  padding-top: 0.6vh;
}

.input-button-payment {
  font-weight: 700;
  line-height: 1em;
  padding: 10px;
  outline: 0;
  color: #fff;
  background-color: $color-orange;
  margin: 0;
  cursor: pointer;
  border-radius: 0.2em;
  border: 1px solid $color-secondary-border;
}

.logged-out-payment {
  padding-left: 10vw;
  padding-right: 40vw;

  .input {
    padding-top: 1vh;
    padding-bottom: 1.2vh;
    padding-left: 1vw;
    padding-right: 3vw;
  }

  @include media-breakpoint-down(md) {
    padding-right: 10vw;
  }
}

.logged-in-payment {
  padding-left: 10vw;
  padding-right: 40vw;

  .input {
    padding-top: 1vh;
    padding-bottom: 1.2vh;
    padding-left: 1vw;
    padding-right: 3vw;
  }

  @include media-breakpoint-down(md) {
    padding-right: 10vw;
  }

  .spacer {
    width: 0em;
    height: 0vh;
  }
}

.card {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.input-redeem-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin: 1em 0;
  border: 1px solid grey;

  padding-bottom: 1vh;
  padding-left: 1vw;
  padding-right: 1.5vw;
  border-radius: 0.3em;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 22vh;
  width: 40vw;

  .redeem-card-bottom {
    display: flex;
    flex-flow: row;
    justify-content: inherit;

    .form-item {
      height: 2vh;
      width: 8vw;
      @include media-breakpoint-down(sm) {
        width: 20vw;
        height: 3vh;
      }
    }
  }

  @include media-breakpoint-down(md) {
    width: 70vw;
  }
  @include media-breakpoint-down(sm) {
    width: 80vw;
    height: 16vh;
  }
}

.span {
  padding-top: 2vh;
  padding-left: 1vw;
  font-size: 2.5vh;
}

.code-span {
  padding-left: 1vw;
  padding-right: 1vw;
}

.buttons {
  display: flex;
  flex-flow: row;
  align-content: center;
  margin-top: 4em;
  justify-content: center;

  & * {
    font-size: 19px;
    margin-right: 0.5em;
    margin-left: 0.5em;
    font-weight: 700;
    line-height: 1em;
    padding: 10px;
    outline: 0;
    color: #fff;
    background-color: $color-orange;
    cursor: pointer;
    border-radius: 0.2em;
    border: 1px solid $color-secondary-border;
  }
}
</style>
