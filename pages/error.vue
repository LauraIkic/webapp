<template>
  <div class="section">
    <h2>Kauf fehlgeschlagen</h2>
    <p class="text">
      Der Kauf wurde abgebrochen oder ist fehlgeschlagen. <br>
      Bei Problemen kontaktiere uns&nbsp;<nuxt-link to="/de/kontakt">hier</nuxt-link>.
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
  computed: {

  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;
    text-align: center;
  }
</style>
