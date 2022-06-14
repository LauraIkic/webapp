const axios = require('axios')
const cookieparser = require('cookieparser')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')
const baseURL = 'https://fabman.io/api/v1/'

// Environment settings
console.log('### Netlify environment is: ' + process.env.NETLIFY_ENVIRONMENT)

// Define routes depending on your environment
let tmpFabmanToken
let tmpClient
let tmpOrigin
switch (process.env.NETLIFY_ENVIRONMENT) {
  case 'develop':
  case 'staging':
    tmpFabmanToken = process.env.FABMAN_TOKEN_STAGING
    tmpClient = jwksClient({
      jwksUri: `${process.env.AUTH0_URL_STAGING}/.well-known/jwks.json`
    })
    tmpOrigin = process.env.ORIGIN_STAGING
    console.log('## Auth0 url:' + process.env.AUTH0_URL_STAGING)
    break
  default: // production
    tmpFabmanToken = process.env.FABMAN_TOKEN
    tmpClient = jwksClient({
      jwksUri: `${process.env.AUTH0_URL}/.well-known/jwks.json`
    })
    tmpOrigin = process.env.ORIGIN
    console.log('## Auth0 url:' + process.env.AUTH0_URL)
}

const fabmanToken = tmpFabmanToken
const client = tmpClient
const origin = tmpOrigin
console.log('## Origin: ' + origin)
console.log('## fabman token: ' + fabmanToken)

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
      const fabmanId = decoded[origin + '/fabmanId']
      console.log(decoded)
      const instance = axios.create({
        baseURL,
        headers: { Authorization: 'Bearer ' + fabmanToken }
      })

      console.log('------- origin: ' + fabmanId)

      const payment = { iban: '' }
      const profile = instance.get(`members/${fabmanId}`).then((r) => {
        return {
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
      })
      const trainings = instance.get(`members/${fabmanId}/trainings`).then(r => r.data)
      const packages = instance.get(`members/${fabmanId}/packages`).then(r => r.data)

      Promise.all([profile, trainings, packages]).then(([profile, trainings, packages]) => {
        const user = {
          profile,
          trainings,
          packages,
          payment
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
