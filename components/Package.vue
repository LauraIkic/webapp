<template>
  <div>
    <div v-if="userPackage" class="package-item">
      <div class="icon">
        <font-awesome-icon icon="cube"/>
      </div>
      <div class="body">
        <div class="title">
          <div v-if="this.userPackage._embedded" class="interval">
            {{ this.userPackage._embedded.package.name }}
          </div>
          <div v-if="this.userPackage.name" class="interval">
            {{ this.userPackage.name }}
          </div>
        </div>
        <div class="package">
          <div class="package-date" v-if="this.userPackage.fromDate">
            {{fromDate}}
            -
            {{untilDate}}<div v-if="untilDate== null">Kein Ende</div>
          </div>
          <div v-if="userPackage.recurringFeePeriod == 'month'" class="interval">
            {{ $t('interval') }} {{ $t('monthly') }}
          </div>
          <div v-if="userPackage.recurringFeePeriod == 'year'" class="interval">
            {{ $t('interval') }}{{ $t('yearly') }}
          </div>
          {{ $t('price') }} {{userPackage.recurringFee}}  {{ $t('euro') }}
          <div v-if="storage && booked && !untilDate" class="button" @click="cancelStorage(userPackage.id)">
              <div class="button-text">
              {{ 'kündigen' }}
              </div>
          </div>
          <div v-if="storage && !booked" class="button" @click="setPackage(userPackage.id)">
            <div class="button-text">
              {{ 'buchen' }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['userPackage', 'storage', 'booked'],
  computed: {
    fromDate () {
      if (this.userPackage.fromDate) {
        return new Date(this.userPackage.fromDate).toLocaleDateString('de-at')
      } else { return null }
    },
    untilDate () {
      if (this.userPackage.untilDate == null) {
        return null
      }
      return new Date(this.userPackage.untilDate).toLocaleDateString('de-at')
    }//,
    // chargedDate () {
    //   return new Date(this.userPackage.chargedUntilDate).toLocaleDateString('de-at')
    // }
  },
  methods: {
    async setPackage (id) {
      await this.$store.dispatch('setPackage', { id: id })
        .then((response) => {
          this.$toast.show('buchung ok', {
            className: 'goodToast'
          })
          this.$emit('reload')
        })
        .catch((error) => {
          switch (error.response.status) {
            case 404:
              this.$toast.show('Lagerort bereits ausgebucht!', {
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
    },
    async cancelStorage (memberPackageId) {
      await this.$store.dispatch('cancelPackage', memberPackageId, { id: memberPackageId })
        .then((response) => {
          this.$toast.show('kündigung ok', {
            className: 'goodToast'
          })
          this.$emit('reload')
        })
        .catch((error) => {
          switch (error.response.status) {
            default:
              this.$toast.show('Ein Fehler ist aufgetreten', {
                className: 'badToast'
              })
              break
          }
        })
    }
  }
}
</script>

<style lang="scss">

.package-item{
  font-size: 1rem;
  font-family: "Roboto Mono", monospace;
  line-height: 1;
  display: flex;
  background: #fafafa;
  padding: 12px;
  margin: 1em 0;
  border: 1px solid grey;
  border-radius: 0.3em;
  width: 300px;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.14118);
  .title{
    font-weight: bold;
    padding-bottom: 10px;
    font-size: 1.3em;
  }
  .body{
    margin-left: 25px;
    .package{
      .package-date{
        display:flex;
        padding-bottom: 10px;
        color: $color-secondary;
      }
      .interval{
        padding-bottom: 10px;
      }
      .button {
          cursor: pointer;
          margin-top: 7%;
          background: $color-secondary;
          border-radius: 15px;
          display: flex;
          color: white;
          padding: 7px;
          font-size: 16px;
          width: 110px;

          //margin-left: 35%;
          //@include media-breakpoint-down(sm) {
          //  margin-left: 35%;
          //}
        }.button-text {
                 text-align: center;
                 width: 8vw;
               }
        & * {
          text-transform: uppercase;
        }
    }
  }

}
</style>
