<template>
  <div>
    <section>
      <h2>Offene Buchungen</h2>
      <loading-spinner
        v-if="!activities"
        color="#333"
      />
      <div
        v-if="activities"
      >
        <ul class="table">
          <li class="table-header">
            <div class="header-item">
              <div class="list_item">Datum</div>
              <div class="list_item booking">Buchung</div>
              <div class="list_item">Betrag</div>
            </div>
          </li>
          <li class="table-content">
            <div
                v-for="activity of activities"
                :key="activity.id"
                class="table-row">
              <div class="table-data">{{ new Date(activity.date).toLocaleDateString('de-AT') }}</div>
              <div class="table-data description">{{activity.description}}</div>
              <div class="table-data" :style="{color: activity.price > 0 ? 'red' : 'green'}">{{Number(activity.price * (-1)).toFixed(2)}} €</div>
            </div>
<!--            <div class="date">-->
<!--              {{ new Date(invoice.issue_date).toLocaleDateString('de-AT') }}-->
<!--            </div>-->
<!--            <div class="name">-->
<!--              {{ invoice.name }}-->
<!--            </div>-->
<!--            <div class="invoiceNumber">-->
<!--              #{{ invoice.human_readable_id }}-->
<!--            </div>-->
<!--            <div class="status">-->
<!--              Status:-->
<!--              <span :class="[[4, 11].includes(invoice.status) ? 'green' : 'noStatus']">{{ getStatus(invoice.status) }}</span>-->
<!--              <span :class="[[2, 8].includes(invoice.status) ? 'yellow' : 'noStatus']">{{ getStatus(invoice.status) }}</span>-->
<!--              <span :class="[[10].includes(invoice.status) ? 'red' : 'noStatus']">{{ getStatus(invoice.status) }}</span>-->
<!--            </div>-->
<!--            <div-->
<!--              v-if="invoice.has_attachment"-->
<!--              class="icon"-->
<!--            >-->
<!--              <font-awesome-icon icon="download"/>-->
<!--            </div>-->
          </li>
          <li class="table-content">
            <div class="table-row end">
              <div class="table-data result">{{totalResult > 0 ? 'Kosten:' : 'Guthaben:'}}</div>
              <div class="table-data" :style="{color: totalResult > 0 ? 'red' : 'green'}">{{totalResult * (-1).toFixed(2)}} €</div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="invoice">
      <h2>Rechnungen</h2>
      <loading-spinner
          v-if="!invoices"
          color="#333"
      />
      <div
          v-if="invoices"
      >
        <ul class="table">
          <li class="table-header">
            <div class="header-item">
              <div class="list_item">Datum</div>
              <div class="list_item">Rechnung</div>
              <div class="list_item">Betrag</div>
              <div class="list_item">Status</div>
            </div>
          </li>
          <li class="table-content">
            <div
                v-for="invoice of invoices"
                :key="invoice.id"
                class="table-row">
              <div class="table-data">{{ new Date(invoice.date).toLocaleDateString('de-AT') }}</div>
              <div class="table-data">{{invoice.number}}</div>
              <div class="table-data">{{invoice.total}} €</div>
              <div class="table-data">
                <span :class="[['paid'].includes(invoice.state) ? 'bubble grey' : 'noStatus']">Bezahlt</span>
                <span :class="[['unpaid'].includes(invoice.state) ? 'bubble yellow' : 'noStatus']">Offen</span>
                <span :class="[['cancelled'].includes(invoice.state) ? 'bubble red' : 'noStatus']">Storno</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Invoices',
  middleware: 'authenticated',
  data () {
    return {
      invoices: null,
      activities: null,
      highlightedId: null
    }
  },
  async mounted () {
    this.invoices = await this.$store.dispatch('getInvoices')
    this.getQuery(this.$route.query)
    this.activities = await this.$store.dispatch('getActivities')
  },
  computed: {
    totalResult () {
      let total = 0
      for (const item in this.activities) {
        total += parseFloat(this.activities[item].price)
      }
      return total
    }
  },
  methods: {
    getQuery (to) {
      if (Object.prototype.hasOwnProperty.call(to, 'id')) {
        this.highlightedId = to.id
      }
    },
    getStatus (state) {
      return this.statuses[state]
    },
    getDate (date) {
      return new Date(date)
    },
    async getPdf (invoice) {
      if (!invoice.has_attachment) {
        return
      }
      await this.$store.dispatch('getPDF', invoice.uuid)
        .then((res) => {
          const blob = new Blob([res.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.download = invoice.filename + '.pdf'
          link.href = URL.createObjectURL(blob)
          link.click()
        })
        .catch((error) => {
          console.log(error.response.status, error.response.msg)
          this.$sentry.captureException(new Error(error))
          this.$toast.show('Die Rechnung konnte nicht geladen werden', {
            className: 'badToast'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.invoice {
  margin: 10% 0;
}
.table {
  margin: 0;
  .table-header {
    display: flex;
    background-color: black;
    color: white;
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    text-transform: uppercase;
    line-height: 1.25rem;
    letter-spacing: 0.05em;
    font-weight: 600;

    .header-item {
      display: flex;
      flex-grow: 1;

      .list_item {
        width: 25%;
        padding-left: 1rem;
        padding-right: 1rem;
      }

      .booking {
        width: 50%;
      }
    }
  }

  .table-content {
    list-style: none;
    background-color: white;
    color: black;
    font-size: 0.9rem;
    line-height: 1.25rem;
    letter-spacing: 0.05em;
    font-weight: 500;

    .table-row {
      display: flex;
      flex-grow: 1;
      padding: 0.75rem 1.25rem;
      border-width: thin;
      border-style: solid;
      border-color: #e2e8f0;

      .table-data {
        width: 25%;
        padding-left: 1rem;
        padding-right: 1rem;
      }

      .description {
        width: 50%;
      }

      .result {
        width: 75%;
        text-align: right;
      }
      .bubble {
        color: white;
        position: absolute;
        width: 90px;
        height: 25px;
        border-radius: 100px;
        text-align: center;
        font-weight: 600;
        padding-top: 2px;
        margin-bottom: 10px;
      }
      .grey {
        background: grey;
      }
      .red {
        background: red;
      }
      .yellow {
        background: #ECAB6D;
      }
      .noStatus {
        display: none;
      }

      .end {
        border-top-style: solid;
        border-top-color: black;
        border-top-width: medium;
      }
    }
  }
}
//.invoices {
//  & .invoice {
//    display: flex;
//    flex-flow: row nowrap;
//    padding: 0.4em;
//    @include media-breakpoint-down(sm) {
//      flex-direction: column;
//      position: relative;
//      background-color: #fafafa;
//      margin: 1em 0;
//      border: 1px solid grey;
//      border-radius: 0.3em;
//      & .icon {
//        position: absolute;
//        top: 1em;
//        right: 0;
//        font-size: 1.3em;
//        margin-right: -1em;
//      }
//      & .name {
//        font-size: 1.1em;
//        padding: 0.4em 0;
//      }
//      & .invoiceNumber {
//        padding-bottom: 0.4em;
//      }
//    }
//
//    & * {
//      margin-right: 2em;
//    }
//
//    & .date {
//      color: grey;
//      width: 5em;
//      transition: highlight 3s;
//    }
//
//    & .name {
//      width: 10em;
//    }
//
//    & .invoiceNumber {
//      width: 8em;
//      color: grey;
//    }
//
//    & .green {
//      color: green;
//    }
//
//    & .red {
//      color: red;
//    }
//
//    & .yellow {
//      color: $color-orange;
//    }
//
//    & .noStatus {
//      display: none;
//    }
//
//    & .status {
//      min-width: 12em;
//    }
//
//    & .info {
//      padding-left: 1em;
//      // text-align: right;
//      color: grey;
//    }
//
//    & .icon {
//      display: flex;
//      align-items: center;
//      color: grey;
//    }
//  }
//}
//
//.invoice:nth-child(odd) {
//  background: #fafafa;
//}
//
//.invoice:hover .icon {
//  color: $color-blue-alt;
//}
//
//.pointer {
//  cursor: pointer;
//}
//
//.highlighted {
//  background: $color-yellow !important;
//}
</style>
