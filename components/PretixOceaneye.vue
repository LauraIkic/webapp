<template>
  <div v-editable="blok"
       class="pretix-oceaneye"
  >
    <link rel="stylesheet" type="text/css" href="https://pretix.eu/grandgarage/oceanEye/widget/v1.css">
    <script type="text/javascript" src="https://pretix.eu/widget/v1.de-informal.js" async></script>
    <div class="content">
      <div class="header">
        <h2 class="title">
          {{ blok.Headline }}
        </h2>
      </div>
      <div class="body">
        <pretix-widget name="pretix" event="https://pretix.eu/grandgarage/oceanEye/"></pretix-widget>
        <noscript>
          <div class="pretix-widget">
            <div class="pretix-widget-info-message">
              JavaScript ist in Ihrem Browser deaktiviert. Um unseren Ticket-Shop ohne JavaScript aufzurufen, klicken Sie bitte <a target="_blank" rel="noopener" href="https://pretix.eu/grandgarage/oceanEye/">hier</a>.
            </div>
          </div>
        </noscript>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss" scoped>
.pretix-widget-wrapper{
  width: 1264px;
  background: white;
}
.content {
  padding: 1.5em;
  margin: 5% 0;
  .header {
    display: flex;
    align-items: flex-start;

    .title {
      flex: 5;
      font-weight: normal;
      margin: 0;
      font-family: $font-secondary;
      min-height: 2em;
    }
  }
  .body {
    font-size: 1rem;
    letter-spacing: 0.03em;
    line-height: 1.4;
  }
}
</style>
