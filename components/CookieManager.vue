<template>
  <div class="cookie-manager">
    <div class="boxContainer">
      <div class="box">
        <div class="title">
          Manage Cookies
        </div>
        <div class="text">
          Genauere Infos zu unseren Cookies findest du unter
          <NuxtLink to="/de/datenschutzerklaerung">Privacy Policy</NuxtLink><br><br>
            <div class="select-buttons">
              <label>
                <input type="checkbox" name="" />
                <div class="icon-box">
                  <i aria-hidden="true"></i>
                  <span></span>
                </div>Necessary
              </label>
              <label>
                <input type="checkbox" name="" />
                <div class="icon-box">
                  <i aria-hidden="true"></i>
                </div><span>Analytics</span>
              </label>
            </div>
          <br><br>
          <Button class="input-button-primary">Accept all</Button>
          <Button  class="input-button-primary">Save</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CookieManager'
}
</script>

<style lang="scss" scoped>
@import '/assets/scss/styles.scss';

.input-button-primary{
    background-color: grey;
    border-color: grey;
}
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
  height: 50vh;
  width: 30vw;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  font-family: "Roboto Mono", monospace;
  .checkbox{
    height: 3vh;
  }
  & .boxContainer {
    & .box {
      display: flex;
      flex-direction: column;
      background-color: black;
      color: white;
      min-height: 12.5em;
      padding: 4em 5em;
      margin: 2em;
      height: 50vh;
      width:50vw;
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
  }
}
</style>
