<template>
  <div class="workshop-dates">
    <div
      v-for="d in dates"
      :key="d.id"
      class="workshop-date"
      :class="{ soldOut: d.content.sold_out }"
    >
      <div class="info-row">
        <div class="info-block">
          <div class="col info">
            <icon name="calendar"/>
            {{ formatDate(d.content.starttime) }}
            <div v-if="d.content.starttime2">
              <br>
              <icon name="calendar"/>
              {{ formatDate(d.content.starttime2) }}
            </div>
          </div>
          <div class="col info">
            <icon name="clock"/>
            <span>{{ formatTime(d.content.starttime) }}</span>
            <span v-if="d.content.endtime"> {{ $t('until') }}{{ formatTime(d.content.endtime) }}</span>
            <span>{{ $t('oClock') }}</span>

            <div v-if="d.content.endtime2">
              <br>
              <icon name="clock"/>
              <span>{{ formatTime(d.content.starttime2) }}</span>
              <span v-if="d.content.endtime2"> {{ $t('until') }} {{ formatTime(d.content.endtime2) }}</span>
              <span>{{ $t('oClock') }}</span>
            </div>
          </div>
        </div>
        <div class="info-block">
          <div
            v-if="d.content.members_only && !d.content.without_registration "
            class="col"
          >
            <icon name="user"/>
            <span>{{ $t('membersOnly') }}</span>
          </div>
          <!--<div class="col soldOut" v-if="d.content.sold_out">
            <span>ausgebucht</span>
          </div>-->

          <div
            v-if="metadata != null && !(d.content.link && d.content.link.cached_url && d.content.link.cached_url != '') && !d.content.without_registration"
            class="col"
          >
            <span>{{ $t('price') }}{{ metadata[d.uuid].price }}EUR</span>
          </div>

          <div
            v-if="metadata == null && logged_in != false && hideRegister != true && !d.content.without_registration"
            class="col"
          >
            <loading-spinner color="black"/>
          </div>
          <div
            v-if="metadata == null && logged_in == false && hideRegister != true && !d.content.without_registration"
            class="col"
          >
            {{ $t('inOrderToBookAWorkshopYouHaveToBeLoggedIn') }} {{ $t('thankYou') }}
          </div>
          <div class="spacer"/>

          <div
            v-if="metadata != null &&metadata[d.uuid].occupancy >= 100 || d.content.sold_out && !d.content.without_registration"
            class="col soldOut"
          >
            <span>{{ $t('soldOut') }}</span>
          </div>
          <div
            v-if="metadata != null &&metadata[d.uuid].occupancy < 100 && !(d.content.link && d.content.link.cached_url && d.content.link.cached_url != '') && !d.content.without_registration"
            class="col occupancy"
          >
            <span>{{ $t('currentOccupancyRate') }} {{ Math.round(metadata[d.uuid].occupancy) }}%</span>
          </div>
          <div class="spacer"/>
          <div
            v-if="metadata && hideRegister !== true && !(d.content.link && d.content.link.cached_url && d.content.link.cached_url != '') && !d.content.without_registration"
            class="col register workshop-button"
          >
            <NuxtLink
              :event="metadata == null || metadata[d.uuid].occupancy >= 100|| metadata[d.uuid].already_booked == true ? '': 'click'"
              :to="{ path: '/me/buyWorkshop', query: { uuid: d.uuid }}"
              class="link"
            >
              {{ metadata != null && metadata[d.uuid].already_booked === true ? 'Bereits gebucht' : 'Zur Anmeldung' }}
            </NuxtLink>
          </div>
          <span v-else class="link" @click="$store.dispatch('setSidebar', 'login')">
              {{ $t('toRegistration') }}
            </span>
          <div
            v-if="hideRegister != true && d.content.link && d.content.link.cached_url && d.content.link.cached_url != '' && !d.content.sold_out"
            class="col register workshop-button"
          >
            <a
              :href="d.content.link.cached_url"
              class="link"
              target="_blank"
            > {{ $t('toRegistration') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  props: {
    dates: Array,
    date: Array,
    hideRegister: Boolean,
    noMetadata: Boolean
  },
  data () {
    return {
      metadata: null,
      logged_in: null
    }
  },
  computed: {
    content () {
      return this.date.content
    }
  },
  mounted () {
    if (this.noMetadata !== true) {
      this.loadMetaData()
    }
  },
  created () {

  },
  methods: {
    formatDate: function (value) {
      return moment(value).format('DD.MM.YYYY')
    },
    formatTime: function (value) {
      return moment(value).format('HH:mm')
    },
    loadMetaData: function () {
      const body = {
        workshop_date_uuids: []
      }

      for (const date of this.dates) {
        body.workshop_date_uuids.push(date.uuid)
      }
      this.$store.dispatch('checkAuth').then((isLoggedIn) => {
        if (isLoggedIn !== false) {
          this.$store.dispatch('getWorkshopDateMetadata', body).then((data) => {
            this.metadata = data
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.logged_in = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';

.workshop-dates {
  width: 100%;
  margin-top: 20px;

  .workshop-date {
    margin-top: 4px;
    padding: 10px;
    background-color: #FFF;

    &.soldOut {
      color: #666;
      fill: #666;

      .col {
        &.info {
          text-decoration: line-through;
        }
      }
    }

    .info-row {
      @include media-breakpoint-down(md) {
        flex-direction: column;
      }
      line-height: 1.6;
      font-family: $font-mono;
      font-size: 0.9rem;
      font-weight: bold;
      margin: -8px;
      display: flex;

      .info-block {
        flex: 1;
        flex-direction: row;
        display: flex;
      }

      .col {
        padding: 4px;
        align-items: center;

        &.soldOut {
          color: $color-orange;
          text-transform: uppercase;
        }

        &.register {
          display: flex;
          background-color: $color-orange;

          a {
            color: #FFF;
          }
        }
      }

      .spacer {
        flex: 1;
      }

      svg {
        height: 1em;
        width: 1em;
      }
    }
  }

  .disabled {
    background-color: lightgray !important;
    pointer-events: none;
  }

  .link {
    cursor: pointer;
    color: white;
  }

  br {
    display: block;
    margin: 4px;
  }
}
</style>
