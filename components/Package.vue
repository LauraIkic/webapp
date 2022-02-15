<template>
  <div>
    <div v-if="userPackage" class="package-item">
      <div class="icon">
        <font-awesome-icon icon="cube"/>
      </div>
      <div class="body">
        <div class="title"> Paket</div>
        <div class="package">
          <div class="package-date">
            {{fromDate}}
            -
            {{untilDate}}<div v-if="untilDate== null">Kein Ende</div>
          </div>
          <div v-if="userPackage.recurringFeePeriod == 'month'" class="interval">
            Interval: monatlich
          </div>
          <div v-if="userPackage.recurringFeePeriod == 'year'" class="interval">
            Interval: jährlich
          </div>
          Preis: {{userPackage.recurringFee}} Euro
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['userPackage'],
  computed: {
    fromDate () {
      return new Date(this.userPackage.fromDate).toLocaleDateString('de-at')
    },
    untilDate () {
      if (this.userPackage.untilDate == null) {
        return null
      }
      return new Date(this.userPackage.untilDate).toLocaleDateString('de-at')
    },
    chargedDate () {
      return new Date(this.userPackage.chargedUntilDate).toLocaleDateString('de-at')
    }
  }
}
</script>

<style lang="scss">
@import '/assets/scss/styles.scss';
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
    font-size: 1.5em;
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
    }
  }
}
</style>
