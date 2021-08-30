<template>
  <transition name="fade">
  <div class="cookie-manager">
    <div class="boxContainer">
      <div class="box">
        <div class="title">
          {{ $t('manageCookies') }}
        </div>
        <div class="text">
          {{ $t('cookiesDescription') }}<br><br>
            <div class="select-buttons">
              <label>
                <input type="checkbox" name=""  v-model="necessaryCookie"/>
                <div class="icon-box">
                  <span></span>
                </div>{{ $t('necessaryCookies') }}
              </label>
              <label>
                <input type="checkbox" name="" v-model="analyticsCookie"/>
                <div class="icon-box">
                  <i aria-hidden="true"></i>
                </div><span>{{ $t('analyticsCookies') }}</span>
              </label>
            </div>
          <br><br>
          <div>{{ $t('findOutMoreAboutCookies') }} <NuxtLink to="/de/datenschutzerklaerung">{{ $t('here') }}</NuxtLink></div>
          <br>
          <div class="confirm-buttons">
            <Button class="input-button-primary"
                    @click=selectAll> {{ $t('selectAll') }}</Button>
            <Button
                :disabled="!necessaryCookie"
                class="input-button-primary"
                @click="setCookiePreferences"
            >    {{ $t('save') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>

export default {
  name: 'CookieManager',
  data: () => ({
    necessaryCookie: true,
    analyticsCookie: false
  }),
  methods: {
    selectAll () {
      this.necessaryCookie = true
      this.analyticsCookie = true
    },
    setCookiePreferences () {
      this.$store.commit('setNecessaryCookie', this.necessaryCookie)
      this.$store.commit('setAnalyticsCookie', this.analyticsCookie)
      sessionStorage.setItem('hasAcceptedNecessaryCookie', this.necessaryCookie)
      sessionStorage.setItem('hasAcceptedAnalyticsCookie', this.analyticsCookie)
      console.log(this.necessaryCookie)
      this.close()
    },
    close () {
      this.$emit('close')
      sessionStorage.setItem('hasSeenPopup', 'true')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';
.select-buttons label {
  padding: 10px;
  cursor: pointer;
  display: flex;
}

.select-buttons label input[type="checkbox"] {
  display: none;
}

.select-buttons label .icon-box {
  position: relative;
  display: flex;
  width: 30px;
  padding: 3px;
  flex-direction: column;
  align-items: center;
  background-color: #353746;
  color: #fff;
  border-radius: 3px;
  font-size: 21px;
  transition: 0.5s;
  user-select: none;
  margin-right: 4vw;
}

.select-buttons label input[type="checkbox"]:checked ~ .icon-box {
  background: $color-secondary;
  background-image: url(assets/img/icons/check.svg);
  background-size: 20px;
  background-position: center;
  color: #fff;
  background-repeat: no-repeat;
}

.select-buttons label .icon-box span {
  margin: 5px;
  font-size: 18px;
}

.select-buttons .btn {
  width: 130px;
  height: 40px;
  position: absolute;
  left: 550px;
  font-size: 16px;
  border: 0;
  outline: none;
  transition: 0.5s cubic-bezier(0.755, 0.05, 0.855, 0.06);
}

.cookie-manager{
  background: repeating-linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 0.3) 70px,
          rgba(0, 0, 0, 0.8) 70px,
          rgba(0, 0, 0, 0.8) 140px
  );
  z-index: 1001;
  width: 100vw !important;
  height: 100vh !important;
  display: flex;
  position:absolute;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto Mono", monospace;
  .checkbox{
    height: 3vh;
  }
  & .boxContainer {
    & .box {
      display: flex;
      flex-direction: column;
      background-color: #191919;
      position: relative;
      z-index: 1000000000;
      color: white;
      min-height: 12.5em;
      padding: 4em 5em;
      margin: 2em;
      height: 45vh;
      width:43vw;
      border: 2px solid #313130;
      border-radius: 25px;
      & .title {
        font-size: 1.5em;
        font-weight: bolder;
      }
      & .text {
        margin-top: 1.5em;
        line-height: 1.3em;
        @include media-breakpoint-down(sm) {
          margin-right: 0;
        }
      }
    }
    .confirm-buttons{
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .input-button-primary{
        width:12vw;
        height: 3.5vh;
        border-radius: 3px;
        font-size:1.5rem;
      }
    }
  }
}
</style>
