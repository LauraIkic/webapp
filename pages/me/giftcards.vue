<template href="http://www.w3.org/1999/html">
  <div>
    <span class="flex-center" style="margin-top: 2em;">
      <h2 v-if="action" class="headline">
        {{ $t('giftCard') }} {{ action === 'buy' ? 'kaufen' : 'einlösen' }}
      </h2>
      <h2 v-else class="headline">
        {{ $t('giftCard') }}
      </h2>
      <loading-spinner
        v-if="loading"
        color="#333"
        style="margin-left: 0.5em;"
      />
    </span>
    <template v-if="!action">
      <div class="items ">
        <section class="display-item ">
          <div class="top">
            <div class="buy-image"></div>
          </div>
          <div class="bottom">
            <div class="buy-redeem-button"
                 @click="$router.push('giftcards?action=buy')">
              {{ $t('buyGiftCard') }}
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
                 @click="$router.push('giftcards?action=redeem')">
              {{ $t('redeemGiftCard') }}
            </div>
          </div>
        </section>
        <br>
      </div>
    </template>

    <transition name="fade">
      <template>
        <template v-if="action === 'buy'">
          <div v-if="step === 0" class="giftcardForm">
            <section class="buy-gift-cards">
              <div class="input gg-card" @click="selectedProductId='719'">
                <input type="radio" value="719" v-model="selectedProductId">
                <span> {{ $t('giftCardValue') }} </span>
                <div class="bottom-gift-card">
                  <option class="options" value="719">10€</option>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="30">
                  </div>
                </div>
              </div>
              <div class="input gg-card" @click="selectedProductId='720'">
                <input type="radio" value="720" v-model="selectedProductId">
                <span> {{ $t('giftCardValue') }} </span>
                <div class="bottom-gift-card">
                  <option class="options" value="720">25€</option>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="30">
                  </div>
                </div>
              </div>
              <div class="input gg-card" @click="selectedProductId='721'">
                <input type="radio" value="721" v-model="selectedProductId">
                <span> {{ $t('giftCardValue') }} </span>
                <div class="bottom-gift-card">
                  <option class="options" value="721">50€</option>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="30">
                  </div>
                </div>
              </div>
              <div class="input gg-card" @click="selectedProductId='722'">
                <input type="radio" value="722" v-model="selectedProductId">
                <span> {{ $t('giftCardValue') }} </span>
                <div class="bottom-gift-card">
                  <option class="options" value="722">100€</option>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="30">
                  </div>
                </div>
              </div>
            </section>
            <div class="buttons">
              <button
                class="input-button-primary"
                :disabled="!selectedProductId || !invoiceContact"
                @click="step++">
                Weiter
              </button>
            </div>
          </div>
          <div v-if="step === 1">
            <h4>Zahlungsmethode</h4>
            <div class="payment-methods">
              <div class="input gg-card" @click="paymentMethod='1'">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  name="paymentMethod"
                  value="1">
                Kreditkarte / PayPal
                <div v-if="invoiceContact.sepa_mandate_agreed"></div>
              </div>
              <div class="spacer"></div>
              <div class="input gg-card" @click="paymentMethod='2'">
                <input
                  v-model="paymentMethod"
                  type="radio"
                  name="paymentMethod"
                  value="2">
                SEPA-Monatsrechnung
              </div>
            </div>
            <div v-if="invoiceContact != null">
              <h4>Rechnungsadresse</h4>
              <table>
                <tr>
                  <th>
                    <span class="label">Firmenname</span>
                  </th>
                  <th>
                    <input
                        v-model="invoiceContact.company_name"
                        class="input-text"
                        type="text"
                        name=""
                    >
                  </th>
                  <th v-if="invoiceContact.company_name">
                    Uid* <!-- TODO implement a validator for business-iddentification-number (UID) -->
                    <input
                        v-model="invoiceContact.uid"
                        class="input-text"
                        type="text"
                        name=""
                    >
                  </th>
                </tr>
                <tr>
                  <th>
                    <span class="label">Vorname</span>
                  </th>
                  <th>
                    <input
                      v-model="invoiceContact.firstname"
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
                    v-model="invoiceContact.lastname"
                    class="input-text"
                    type="text"
                    name=""
                  >
                </th>
                <tr>
                  <th>
                    <span class="label">Telefon</span>
                  </th>
                  <th>
                    <input
                      v-model="invoiceContact.phone"
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
                      v-model="invoiceContact.street"
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
                      v-model="invoiceContact.street_additional"
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
                      v-model="invoiceContact.zip"
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
                      v-model="invoiceContact.city"
                      class="input-text"
                      type="text"
                      name=""
                    >
                  </th>
                </tr>
              </table>
            </div>
            <br><br>
            <div class="bottom-buttons">
              <div class="buttons">
                <button
                  class="input-button-back"
                  @click="step--"
                >
                  Zurück
                </button>
                <button
                  class="input-button-primary"
                  :disabled="(!paymentMethod || !validInvoiceContact)"
                  @click="step++"
                >
                  Bestellung prüfen
                </button>
              </div>
            </div>
          </div>
          <div v-if="step === 2 && invoiceContact !== null">
            Bestätigung:
            <ul>
              <li>Gutschein {{ getGiftCardValue(selectedProductId) }}€</li>
            </ul>
            <div class="buttons">
              <button
                class="input-button-back"
                @click="step--"
              >
                Zurück
              </button>
              <button
                v-if="parseInt(paymentMethod) === 1"
                class="input-button-payment"
                :disabled="!paymentMethod || loading"
                @click="checkout()"
              >
                {{ $t('toPaymentProcess')}}
              </button>
              <button
                v-else
                class="input-button-payment"
                :disabled="!paymentMethod || loading"
                @click="checkout()"
              >
                {{ $t('buyLiableToPayTheCosts')}}
              </button>
            </div>
          </div>
          <div v-if="step === 3" style="text-align: center">
            <div style="margin: 2em 0;"><img width="80px" src="~/assets/img/icons/thumbs-up.svg" class="decorator">
            </div>
            <h2 style="margin: 0;">Kauf abgeschlossen!</h2>
            <p class="text">
              Die Rechnung und deinen Gutschein erhältst du per Mail.
            </p>
          </div>
        </template>

        <template v-if="action === 'redeem'">
          <div
            v-if="step === 0"
            class="giftcardForm"
          >
            <div class="input-redeem-card">
              <span class="span">
                Gutschein</span>
              <div class="redeem-card-bottom">
                <div class=" code">
                  <span class="code-span"> Code: </span>
                  <input
                    v-model="giftcardCode"
                    class="form-item"
                  >
                </div>
                <div class="image">
                  <img src="~/assets/img/icons/gg-logo-icon.svg"
                       width="40">
                </div>
              </div>
            </div>
            <div class="buttons">
              <button
                class="input-button-payment"
                :disabled="!giftcardCode"
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
  middleware: 'authenticated',
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
      giftcardCode: null,
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
    },
    validInvoiceContact () {
      if (!this.invoiceContact) {
        return false
      }
      return (this.invoiceContact.firstname && this.invoiceContact.lastname && this.invoiceContact.street && this.invoiceContact.city && this.invoiceContact.zip)
    }
  },
  watch: {
    '$route.query' (to) {
      this.getQuery(to)
    }
  },
  mounted () {
    this.loading = true
    this.$store.dispatch('getUserMetadata')
      .then((data) => {
        this.invoiceContact = data.data.invoice_contact
        this.sepaActive = data.data.sepa_active
      })
      .catch((error) => {
        console.log(error.response.status, error.response.data.msg)
        this.$toast.show('Ein Fehler ist aufgetreten', {
          theme: 'bubble'
        })
      })
      .finally(() => {
        this.loading = false
      })
    this.getQuery(this.$route.query)
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
      await this.$store.dispatch('redeemGiftCard', { uuid: this.giftcardCode })
        .then((response) => {
          this.$toast.show('Der Gutschein wurde erfolgreich eingelöst!', {
            className: 'goodToast'
          })
          if (this.origin) {
            this.$router.push(`buyWorkshop?uuid=${this.origin}`)
          }
          this.$router.push('credits')
        })
        .catch((error) => {
          console.log('error', error.response)
          this.giftcardCode = ''
          switch (error.response.status) {
            case 405:
              this.$toast.show('Dieser Gutschein wurde bereits eingelöst', {
                className: 'badToast'
              })
              break
            case 404:
              this.$toast.show('Kein Gutschein mit diesem Code gefunden', {
                className: 'badToast'
              })
              break
            default:
              this.$toast.show('Ein Fehler ist aufgetreten', {
                className: 'badToast'
              })
              break
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    checkout () {
      this.loading = true
      const data = {
        payment_method: parseInt(this.paymentMethod),
        product_id: this.selectedProductId,
        count: 1,
        invoice_contact: this.invoiceContact
      }

      this.$store.dispatch('checkout', data)
        .then((response) => {
          switch (parseInt(this.paymentMethod)) {
            case 1: // PAYMENT PROVIDER
              if (response.data.redirect_link) {
                if (response.data.invoice_contact) {
                  this.connectorInvoiceContact = response.data.invoice_contact
                }
                // Redirect to payrexx screen
                window.location.href = response.data.redirect_link
              } else {
                console.log('Error: No payrexx redirect_link returned!', response.data)
                throw new Error('No payrexx redirect_link returned!')
              }
              break
            case 2: // SEPA
              this.step++
              break
          }
        })
        .catch((error) => {
          console.log('error', error)
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

a {
  color: $color-orange;
}

a:hover {
  text-decoration: underline;
}

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
}

.spacer {
  background-size: cover;
  width: 2em;
  position: relative;
}

.display-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 17em;
  height: 19em;
  position: relative;
  border: 1px solid black;
  color: white;

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
    background: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    bottom: 0;
    height: 5em;
    width: 100%;
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
  .input-button-primary {
    width: 100%;
    background: black;
    color: white;
    height: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4em;
    padding-left: 65vw;
    padding-top: 3vh;
  }

  .buy-button {
    width: 100%;
    background: black;
    color: white;
    height: 5.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    font-family: $font-mono;
  }

  .redeem-button {
    width: 100%;
    background: black;
    color: white;
    height: 5.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    font-family: $font-mono;
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

  .bottom-gift-card {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    padding-left: 3vw;
    padding-top: 0.5vh;
  }
}

.input {
  background-color: white;
  margin: 1em 0;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 1vw;
  padding-right: 3vw;
  border: 1px solid grey;
  border-radius: 0.3em;
}

.image {
  padding-top: 0.6vh;
}

.input-button-primary {
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

.payment-methods {
  position: relative;
  display: flex;
  flex-flow: wrap;
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
  padding-right: 3vw;
  border-radius: 0.3em;
  flex-direction: column;
  height: 14vh;
  width: 40vw;

  .redeem-card-bottom {
    display: flex;
    flex-flow: row;
    justify-content: inherit;

    .form-item {
      height: 2vh;
      width: 8vw;
    }
  }
}

.span {
  padding-top: 2vh;
  padding-left: 1vw;
  font-size: 2vh;
}

.code-span {
  padding-left: 1vw;
  padding-right: 1vw;
}

.buttons {
  & * {
    margin-right: 1em;
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
