<template>
  <div class="section">
    <input type="text" v-model="codeValue"/>
    <button @click="encryptCode"> Submit Code </button>
    <button @click="sendAPIRequest"> API request
    </button>
  </div>
</template>

<script >
export default {
  data () {
    return {
      loading: false,
      codeValue: 123456,
      cypher_mode: 'AES/CBC/ZeroBytePadding',
      cypher_mode_iv: 'SHA1PRNG'
    }
  },
  computed: {},
  created () {
  },
  methods: {
    sendAPIRequest () {
      this.$store.dispatch('getCultureCard', 'eyJ2YWx1ZSI6IllMU3dkTUkwN\n' +
          'zJRMHp1NFp5dVQ3K3BQSzhcL0N6aTZcL2ticitLQjhtK2tsdlFGZ2FBSjlYSHlySm5Oc1NMXC9weVNwb\n' +
          'DJIb25GQURiOW\n' +
          'ZPbjMzTmFpM01INUZvZ1hzcFZYMURsOFNzUXlYOUozVUNmS0J2TEpXdjlXOGhPZ\n' +
          '2pmQk13NDNRMExjODFTY0JxbjNWd1JQS1piUT09IiwiaXYiOiIyRHVWWWdXSDByaFRtc2J5VWJHY0\n' +
          '9RPT0iLCJtYWMiOiI3ODE4OGZjMzg3NmIwOTY1MTIzOTZjOGJhOGE4NWM5MWFiOTllZWNlYzM4Z\n' +
          'DVlM2Q1MTUwZDM5YTg1NTIxOTY3In0')
    },
    encryptCode () {
      const cipher = crypto.createCipheriv(this.cypher_mode, this.cypher_mode_iv, '')
      const encrypted = cipher.update(this.codeValue, 'UTF-8', 'hex')
      console.log(encrypted)
    },
    changeCode () {
      // return encrypted
    }
  }
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
