<template>
  <div class="section">
    {{ $t('purchaseCompleted') }}  {{ $t('receiptAndConfirmationViaMail') }}
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
    justify-content: center;
    margin-top: 5%;
  }
</style>
