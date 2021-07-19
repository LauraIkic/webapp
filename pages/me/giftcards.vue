<template href="http://www.w3.org/1999/html">
  <div>
    <h2 v-if="action">
      Gutschein {{ action === 'buy' ? 'kaufen' : 'einlösen' }}
    </h2>
    <h2 v-else>
      Gutscheine
    </h2>
    <template v-if="!action">
      <selection class="items">
        <section class="display-item">
          <div class="bottom">
            <div class="buy-button"
                 @click="$router.push('giftcards?action=buy')">
              Gutschein kaufen
            </div>
          </div>
        </section>
        <section class="display-item">
          <div class="bottom">
            <div class="redeem-button"
                 @click="$router.push('giftcards?action=redeem')">
              Gutschein einlösen
            </div>
          </div>
        </section>
      </selection>
    </template>

    <transition name="fade">
      <template>
        <template v-if="action === 'buy'">
          <div v-if="step === 0" class="giftcardForm">
            <section class="buy-gift-cards">
              <div class="input">
                <input type="radio" value="719" v-model="selectedProduct">
                <span> Gutschein-Wert: </span>
                <div class="bottom-gift-card">
                  <option class="options" value="719">10€</option>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="30">
                  </div>
                </div>
              </div>
              <div class="input">
                <input type="radio" value="720" v-model="selectedProduct">
                <span> Gutschein-Wert: </span>
                <div class="bottom-gift-card">
                  <option class="options" value="720">25€</option>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="30">
                  </div>
                </div>
              </div>
              <div class="input">
                <input type="radio" value="721" v-model="selectedProduct">
                <span> Gutschein-Wert: </span>
                <div class="bottom-gift-card">
                  <option class="options" value="721">50€</option>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="30">
                  </div>
                </div>
              </div>
              <div class="input">
                <input type="radio" value="722" v-model="selectedProduct">
                <span> Gutschein-Wert: </span>
                <div class="bottom-gift-card">
                  <option class="options" value="722">100€</option>
                  <div class="image">
                    <img src="~/assets/img/icons/gg-logo-icon.svg"
                         width="30">
                  </div>
                </div>
              </div>
              <!--              <select
                                v-model="selectedProduct"
                                class="form-item"
                            >
                              <option value="719">
                                10€
                              </option>
                              <option value="720">
                                25€
                              </option>
                              <option value="721">
                                50€
                              </option>
                              <option value="722">
                                100€
                              </option></select>-->
            </section>

            <!--            <div class="input">
                          <span> Extras: </span>
                          <select
                              v-model="selectedExtra"
                              class="form-item"
                          >
                            <option value="733">
                              E-mail - Gratis
                            </option>
                            <option value="734">
                              Versand-Standard - 3€
                            </option>
                            <option value="735">
                              Deluxe-Box - 25€
                            </option>
                          </select>
                        </div>-->

            <div class="buttons">
              <button
                  class="input-button-primary"
                  :disabled="!selectedProduct"
                  @click="step++"
              >
                Weiter
              </button>
            </div>
          </div>

          <div v-if="step === 1">
            <h4>Zahlungsmethode</h4>
            <div class="payment-methods">
              <div class="input">
                <input
                    v-model="paymentMethod"
                    type="radio"
                    name="paymentMethod"
                    value="1"
                >Kreditkarte
                <div v-if="invoiceContact.sepa_mandate_agreed">
                </div>
              </div>
              <div class="input">
                <input
                    v-model="paymentMethod"
                    type="radio"
                    name="paymentMethod"
                    value="2"
                >SEPA-Monatsrechnung
              </div>
            </div>
            <div v-if="invoiceContact != null">
              <h4>Rechnungsadresse</h4>
              <table>
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
            </div><br>
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
                    :disabled="!paymentMethod"
                    @click="step++"
                >
                  Bestellung prüfen
                </button>
              </div>
            </div>
          </div>
          <div v-if="step === 2">
            Bestätigung:
            <ul>
              <li>Gutschein {{ getGiftCardValue(selectedProduct) }}€</li>
              <li>Extra: {{ getExtra(selectedExtra) }}</li>
            </ul>

            <div class="buttons">
              <button
                  class="input-button-back"
                  @click="step--"
              >
                Zurück
              </button>
              <button
                  class="input-button-payment"
                  :disabled="!paymentMethod || loading"
                  @click="checkout()"
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
    <loading-spinner
        v-if="loading"
        color="#333"
    />
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
      selectedProduct: null,
      selectedExtra: null,
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
    }
  },
  watch: {
    '$route.query' (to) {
      this.getQuery(to)
    }
  },
  mounted () {
    this.$store.dispatch('getUserMetadata').then((data) => {
      this.invoiceContact = data.data.invoice_contact
      this.sepaActive = data.data.sepa_active
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
      const response = await this.$store.dispatch('redeemGiftCard', {
        uuid: this.giftcardCode
      })
      if (!response.success) {
        if (response.already_redeemed) {
          this.$toast.show('Dieser Gutschein ist bereits eingelöst worden!', {
            className: 'badToast'
          })
          this.giftcardCode = ''
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
    checkout () {
      this.loading = true
      const data = {
        payment_method: parseInt(this.paymentMethod),
        productCounts: [
          {
            product_id: this.selectedProduct,
            count: 1
          },
          {
            product_id: this.selectedExtra,
            count: 1
          }
        ],
        invoice_contact: this.invoiceContact
      }

      this.$store.dispatch('checkout', data).then((data) => {
        if (data.success) {
          this.loading = false
          switch (parseInt(this.paymentMethod)) {
            case 1:
              this.redirectToStripe(data.session_id)
              break
            case 2:
              this.step++
              break
          }
        } else {
          this.$sentry.captureException(new Error(data))
          this.$toast.show('Ein Fehler ist aufgetreten', {
            theme: 'bubble'
          })
        }
      })
    },
    redirectToStripe: function (sessionId) {
      // eslint-disable-next-line no-undef
      const stripe = Stripe('pk_live_XCUCaJMt8kMEpedQdvmtMu4Z00rNP9VDun')
      stripe.redirectToCheckout({
        sessionId: sessionId
      })
    },
    getExtra (id) {
      switch (id) {
        case '733':
          return 'Digital per E-Mail'
        case '734':
          return 'Versand'
        case '735':
          return 'Abholung Deluxe-Box'
      }
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

.items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 600px) {

  }
}

.display-item {
  background-repeat: no-repeat;
  background-size: cover;
  width: 17em;
  height: 19em;
  position: relative;
  border: 1px solid black;
  color: white;

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

.display-item:hover .buy-button {
  border-top: 1px solid white;
  background: $color-orange;
}

.display-item:hover .redeem-button {
  border-top: 1px solid white;
  background: $color-orange;
}

/*.display-item:hover .buttons {
  border-top: 1px solid white;
  background: $color-orange;
}*/

/*
.form-item {
  display: flex;
  flex-flow: row nowrap;
  width: 20em;
  justify-content: space-between;
  align-items: center;
  cursor:pointer;
  padding: 0.5vh 0.5vh;
  background: #c0c0c6;
  border-radius: 8px;
}*/

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
  background-color: #fafafa;
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
  border: none;
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
  border: none;
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

/*
.input:hover{
  background: $color-orange;
  color: white;
}
*/

.input-redeem-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: #fafafa;
  margin: 1em 0;
  border: 1px solid grey;

  padding-bottom: 1vh;
  padding-left: 1vw;
  padding-right: 3vw;
  border-radius: 0.3em;
  display: flex;
  justify-content: space-between;
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

/*.selectedProduct{
  background: $color-orange;
}
.flex-element{
  padding-bottom: 1vh;
}
!*.giftcardForm {
  & .input {
    display: flex;
    flex-flow: column;

    & :first-child {
      width: 7em;
    }
  }
}*!

.buttons {
  & * {
    margin-right: 1em;
      font-weight: 700;
  line-height: 1em;
  padding: 10px;
  outline: 0;
  color: #fff;
  border: none;
  background-color: $color-orange;
  margin: 0;
  cursor: pointer;
  border-radius: 0.2em;
  border: 1px solid $color-secondary-border;
  }
}

h5 {
  font-size: 1rem;
}*/

.buttons {
  & * {
    margin-right: 1em;
    font-weight: 700;
    line-height: 1em;
    padding: 10px;
    outline: 0;
    color: #fff;
    border: none;
    background-color: $color-orange;
    cursor: pointer;
    border-radius: 0.2em;
    border: 1px solid $color-secondary-border;
  }

}
</style>
