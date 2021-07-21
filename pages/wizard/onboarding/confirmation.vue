<template>
  <div class="section">
    <img width="80px" src="~/assets/img/icons/fireworks.svg" class="decorator">
    <h2>Gratulation!</h2>
    <p class="text">
      Der erste Schritt zum GRAND GARAGE Membership ist geschafft!<br>
      Um deine Mitgliedschaft abzuschließen kannst du hier die allgemeine Sicherheitsunterweisung abschließen.
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
