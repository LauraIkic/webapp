<template>
  <section class="workshop-overview">
    <div
        v-editable="blok"
        class="pretix-oceaneye"
    >
      <link rel="stylesheet" type="text/css" href="https://pretix.eu/grandgarage/oceanEye/widget/v1.css">
      <script type="text/javascript" src="https://pretix.eu/widget/v1.de.js" async></script>
      <div class="pretix-content">
        <div>
          <pretix-widget name="pretix" event="https://pretix.eu/grandgarage/oceanEye/"></pretix-widget>
        </div>
        <noscript>
          <div class="pretix-widget">
            <div class="pretix-widget-info-message">
              JavaScript is disabled in your browser. To access our ticket shop without JavaScript,
              please <a target="_blank" href="https://pretix.eu/ggTest">click here</a>.
            </div>
          </div>
        </noscript>
      </div>
      </div>
  </section>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style lang="scss">
.pretix-content {
  display: flex;
  justify-content: center;
  margin: 5% 0;
  .pretix-widget-wrapper{
    a {
      color: $color-secondary;
      text-decoration: none;
    }
    a:hover {
      color: $color-secondary;
      text-decoration: underline;
    }
    button {
      background-color: $color-secondary;
      border-color: $color-secondary;
    }
    button:hover {
        background-color: black;
        border-color: black;
    }
    width: 70vw;
    max-width: 1264px;
    background: white;
    .pretix-widget-event-calendar-previous-month{
      padding: 10px;
    }
    .pretix-widget-event-calendar-next-month{
      padding: 10px;
    }
  }
}
</style>
