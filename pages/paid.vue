<template>
  <div class="section">
    <div style="margin: 2em 0;"><img width="80px" src="~/assets/img/icons/fireworks.svg" class="decorator"></div>
    <h2 style="margin: 0;">Kauf abgeschlossen!</h2>
    <p class="text">
      Die Rechnung und Bestätigung wird dir per E-Mail zugestellt.
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  created () {
  },
  methods: {}
}
</script>

<style lang="scss">
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5%;
  text-align: center;
}
</style>
