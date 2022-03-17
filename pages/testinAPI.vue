<template>
  <div class="section">
    <input type="text" v-model="coupon_key"/>
    <button @click="encryptCode"> Submit Code </button>
    <button @click="sendAPIRequest"> API request</button>
    <button @click="decryptionTest"> Decode</button>
  </div>
</template>

<script >

export default {
  data () {
    return {
      loading: false,
      coupon_key: 6170000006,
      redeem_date: 1286740722,
      location_id: 12,
      device_key: 'aef792hkf62',
      cypher_mode: 'AES/CBC/ZeroBytePadding',
      cypher_mode_iv: 'SHA1PRNG'
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    decryptionTest () {
      const crypto = require('crypto')
      // eslint-disable-next-line new-cap
      const ivDecoded = new Buffer.from(this.cypher_mode_iv, 'base64') //base64Decode(paraIv);
      console.log('ivDecoded Value')
      console.log(ivDecoded)
      // eslint-disable-next-line new-cap
      const keyBuffer = new Buffer.from(this.cypher_mode, 'binary')
      console.log('keyBuffer')
      console.log(keyBuffer)
      const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivDecoded)
      console.log('decipher')
      console.log(decipher)
      // decipher.setAutoPadding(false)
      // let decrypted = decipher.update(paraEncryptedValue, 'base64', 'utf8')
      // decrypted += decipher.final('utf8')
      // // get rid of null bytes at the end ...
      // return decrypted.replace(/^\0+/, '').replace(/\0+$/, '')
    },
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
      const crypto = require('crypto')
      const dummyJSON = {
        coupon_key: '006170000006',
        redeem_date: 1486740722,
        location_id: 12,
        device_key: 'aef792hkf62'
      }
      let iv = crypto.randomBytes(16)
      iv = iv.toString('hex').slice(0, 16)
      const keyTest = crypto.randomBytes(32)
      //create cipher
      const cipher = crypto.createCipheriv('aes-256-cbc', keyTest, iv)
      let encrypted = ''
      cipher.on('readable', () => {
        let chunk
        while ((chunk = cipher.read()) !== null) {
          encrypted += chunk.toString('base64')
          console.log('HUHU1')
          console.log(encrypted)
        }
      })
      // Handling end event
      cipher.on('end', () => {
        console.log(encrypted)
      })

      // Writing data

      let crypted = cipher.update(encrypted, 'utf8', 'base64')
      crypted += cipher.final('base64')
      console.log(crypted)
      //hmac calculation
      const mac = crypto.createHmac('sha256', Buffer.from(iv).toString('base64')).update(crypted).digest('base64')
      const returnData = {
        value: crypted.toString(),
        iv: Buffer.from(iv).toString('base64'),
        mac: mac.toString()
      }
      console.log(returnData.toString())
      // eslint-disable-next-line new-cap
      const payloadBuffer = new Buffer.from(returnData.toString())
      ///
      const testResult = JSON.stringify(returnData)
      const finalResult = btoa(testResult)
      //var string = finalResult.toString('base64');
      console.log('final result')
      console.log(finalResult)
      console.log('done')
    },
    changeCode () {
      const crypto = require('crypto')
      let iv = crypto.randomBytes(16)
      iv = iv.toString('hex').slice(0, 16)
      // eslint-disable-next-line new-cap
      const keyBytes = new Buffer.from('password')
      const cipher = crypto.createCipheriv('aes-256-cbc', keyBytes, iv)
      const dummyJSON = {
        coupon_key: '006170000006',
        redeem_date: 1486740722,
        location_id: 12,
        device_key: 'aef792hkf62'
      }
      let crypted = cipher.update(dummyJSON, 'utf-8', 'base64')
      crypted += cipher.final('base64')
      const mac = crypto.createHmac('sha256', Buffer.from(iv).toString('base64')).update(crypted).digest('base64')
      const values = {
        values: crypted.toString(),
        iv: Buffer.from(iv).toString('base64'),
        mac: mac.toString()
      }
      // eslint-disable-next-line new-cap
      const payloadBuffer = new Buffer.from(values.toString())
      const testResult = JSON.stringify(payloadBuffer)
      const finalResult = btoa(testResult)
      console.log('final result')
      console.log(finalResult)
      console.log('done')
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
