<template>
  <div style="overflow: hidden">
    <div class="maintenance-page">
      <div class="maintenance-img">
      </div>
      <div class="text-visible">Oops....</div>
      <div class="maintenance-mode">
        <div class="maintenance-mode-text">
          <i class="fas fa-cogs"></i>
          <div class="text">
            <h1>Oops...</h1>
            <p>Diese Seite ist aufgrund von Wartungsarbeiten leider nicht erreichbar.</p>
            <br>
            <p>Wir sind bald wieder für dich da!!!</p>
            <p>Bei Fragen melde dich bitte bei unserem Frontdesk-Team <br><br> frontdesk@grandgarage.eu  </p>
            <h4>Dein GG Team</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    modalVisible: false
  }),
  computed: {
    isAuthenticated () {
      return !!this.$store.state.auth
    }
  },
  async mounted () {
    const hasSeenPopup = localStorage.getItem('hasSeenPopup')
    if (!hasSeenPopup) {
      this.modalVisible = true
    }
    const hasAcceptedNecessaryCookie = localStorage.getItem('hasAcceptedNecessaryCookie')
    if (hasAcceptedNecessaryCookie) {
      this.$store.commit('setNecessaryCookie', 'true')
    }
    const hasAcceptedAnalyticsCookie = localStorage.getItem('hasAcceptedNecessaryCookie')
    if (hasAcceptedAnalyticsCookie === 'true') {
      this.$store.commit('setAnalyticsCookie', 'true')
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/styles.scss';
.maintenance-page {
  max-width: 1400px;
  margin: auto;
  .maintenance-img {
    background-image: url(~/assets/img/maintenance-hover.png);
    height: 300px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .text-visible{
    visibility: hidden;
  }
  .maintenance-mode {
    margin-top: -50px;
    .maintenance-mode-text {
      background: white;
      display: flex;
      align-content: center;
      width: 90%;
      margin:auto;
    }
    .text {
      display: flex;
      flex-flow: column;
      justify-content: center;
      margin: auto;
      padding: 20px;
    }
  }

  @include media-breakpoint-up(lg) {
    .maintenance-img {
      background-image: url(~/assets/img/maintenance.png);
      height: 700px;
      &:hover{
        background-image: url(~/assets/img/maintenance-hover.png);
      }
    }
    .maintenance-mode {
      visibility: hidden;
      padding-bottom: 10vh;
    }
    .text-visible {
      font-size: 6em;
      margin-left: 500px;
      margin-top: -105px;
      font-weight: bold;
      visibility: hidden;
    }
    .maintenance-mode {
      visibility: visible;
      margin-top: -180px;
      margin-left: -30px;

      .maintenance-mode-text {
        width: 1000px;
        background: white;
        display: flex;
        align-content: center;
      }

      .text {
        display: flex;
        flex-flow: column;
        justify-content: center;
        margin: auto;
        font-size: 1.5em;
      }
    }
  }

}
</style>
