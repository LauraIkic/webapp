const cookieparser = require('cookieparser')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

// Environment settings
console.log('### Netlify environment is: ' + process.env.NETLIFY_ENVIRONMENT)

// Define routes depending on your environment
let tmpClient
let tmpOrigin
switch (process.env.NETLIFY_ENVIRONMENT) {
  case 'local':
    tmpClient = jwksClient({
      jwksUri: `${process.env.AUTH0_URL_DEVELOP}/.well-known/jwks.json`
    })
    tmpOrigin = process.env.ORIGIN_LOCAL
    console.log('LOCAL ORIGIN: ' + tmpOrigin)
    console.log('## Auth0 url:' + process.env.AUTH0_URL_DEVELOP)
    break
  case 'develop':
    tmpClient = jwksClient({
      jwksUri: `${process.env.AUTH0_URL_DEVELOP}/.well-known/jwks.json`
    })
    tmpOrigin = process.env.ORIGIN_DEVELOP
    console.log('## Auth0 url:' + process.env.AUTH0_URL_DEVELOP)
    break
  case 'staging':
    tmpClient = jwksClient({
      jwksUri: `${process.env.AUTH0_URL_STAGING}/.well-known/jwks.json`
    })
    tmpOrigin = process.env.ORIGIN_STAGING
    console.log('## Auth0 url:' + process.env.AUTH0_URL_STAGING)
    break
  default: // production
    tmpClient = jwksClient({
      jwksUri: `${process.env.AUTH0_URL}/.well-known/jwks.json`
    })
    tmpOrigin = process.env.ORIGIN
    console.log('## Auth0 url:' + process.env.AUTH0_URL)
}

const client = tmpClient
const origin = tmpOrigin
console.log('## Origin: ' + origin)

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
      const email = decoded[origin + '/email']
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(email)
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
