<template>
  <div class="section">
    <div style="margin-top: 2em;"><img width="80px" src="~/assets/img/icons/fireworks.svg" class="decorator"></div>
    <h2 style="margin: 0;">Gratulation!</h2>
    <p class="text">
      Der erste Schritt zum GRAND GARAGE Membership ist geschafft!<br>
      Um deine Mitgliedschaft abzuschließen kannst du jetzt die allgemeine Sicherheitsunterweisung abschließen.
    </p>
  </div>
</template>
<script>
export default {
  middleware: 'authenticated',
  mounted () {
    this.$store.dispatch('getMemberCourses')
  }
}
</script>
<style lang="scss" scoped>
.section {
  text-align: center;
  margin-top: 1em;
}
</style>
