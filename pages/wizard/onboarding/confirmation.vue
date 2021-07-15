<template>
  <div class="section">
    <h2>Gratulation!</h2>
    <img class="icon" src="~/assets/img/icons/envelope.svg" alt="">
    Der erste Schritt zum GRAND GARAGE Membership ist geschafft!<br>
    Um deine Mitgliedschaft abzuschließen kannst du hier die allgemeine Sicherheitsunterweisung abschließen.
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
