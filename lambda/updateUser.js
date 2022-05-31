const axios = require('axios')
const cookieparser = require('cookieparser')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')
const baseURL = 'https://fabman.io/api/v1/'

// Environment settings
let tmpFabmanToken
const client = jwksClient({
  jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})
if (process.env.NUXT_ENV === 'production') {
  tmpFabmanToken = process.env.FABMAN_TOKEN
} else {
  tmpFabmanToken = process.env.FABMAN_TOKEN_STAGING
}
const fabmanToken = tmpFabmanToken

// TODO: a hell more of exception handling and general hardening
exports.handler = function (event, context, callback) {
  let token = null
  if (event.headers.cookie) {
    const parsed = cookieparser.parse(event.headers.cookie)
    try {
      token = parsed.jwt
    } catch (err) {
      console.log(err)
      return callback(null, {
        statusCode: 401,
        body: 'Unauthorized'
      })
    }
  }

  if (!token) {
    return callback(null, {
      statusCode: 401,
      body: 'Unauthorized'
    })
  }

  function getKey (header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey
      callback(null, signingKey)
    })
  }

  jwt.verify(token, getKey, function (err, decoded) {
    if (!err) {
      const fabmanId = decoded[`${process.env.URL}/fabmanId`]

      const instance = axios.create({
        baseURL,
        headers: { Authorization: 'Bearer ' + fabmanToken }
      })

      const data = JSON.parse(event.body)

      instance.put(`members/${fabmanId}`, data).then((r) => {
        const user = {
          firstName: r.data.firstName,
          lastName: r.data.lastName,
          memberNumber: r.data.memberNumber,
          emailAddress: r.data.emailAddress,
          address: r.data.address,
          address2: r.data.address2,
          city: r.data.city,
          zip: r.data.zip,
          lockVersion: r.data.lockVersion
        }

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(user)
        })
      }).catch((err) => {
        console.log(err)
        callback(null, {
          statusCode: 500,
          body: 'ERROR'
        })
      })
    } else {
      console.log(err)
      callback(null, {
        statusCode: 500,
        body: 'ERROR'
      })
    }
  })
}
