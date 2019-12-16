const moment = require('moment-timezone')
const { jwtExpirationInterval, twitterConfig, jwtSecret } = require('../../../config/vars')
const request = require('request')
const jwt = require('jwt-simple')

exports.twitterReverse = async (req, res, next) => {
  console.log('abcbdvbkfdbvh')
  request.post({
    url: 'https://api.twitter.com/oauth/request_token',
    oauth: {
      consumer_key: twitterConfig.consumerKey,
      consumer_secret: twitterConfig.consumerSecret
    },
    form: {
      oauth_callback: 'https://salty-plains-79519.herokuapp.com'
    }
  }, (err, r, body) => {
    try {
      console.log('err', err, body)

      if (err) {
        return res.send(500, { message: err.message })
      }

      const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'
      console.log('jsonstring', jsonStr)
      return res.send(JSON.parse(jsonStr))
    } catch (error) {
      console.log('error' , error)
      return next(error)
    }
  })
}

exports.twitterAuthToken = async (req, res, next) => {
  try {
    const payload = {
      exp: moment().add(jwtExpirationInterval, 'days').unix(),
      iat: moment().unix(),
      sub: req.body.user_id,
      ...req.body
    }
    req.token = jwt.encode(payload, jwtSecret)

    res.setHeader('x-auth-token', req.token)
    console.log('req.body', req.body)
    // userActivityWebhook()
    return res.status(200).send()
  } catch (error) {
    console.log('errpr', error)
    return next(error)
  }
}

exports.twitterAuth = async (req, res, next) => {
  request.post({
    url: 'https://api.twitter.com/oauth/access_token',
    oauth: {
      consumer_key: twitterConfig.consumerKey,
      consumer_secret: twitterConfig.consumerSecret,
      oauth_token: req.body.oauth_token
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: { oauth_verifier: req.body.oauth_verifier, oauth_token: req.body.oauth_token }
  }, (err, r, body) => {
    try {
      console.log('err, body', err, body, req.body)
      if (err) {
        return res.send(500, { message: err.message })
      }

      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'
      const parsedBody = JSON.parse(bodyString)

      req.body.oauth_token = parsedBody.oauth_token
      req.body.oauth_token_secret = parsedBody.oauth_token_secret
      req.body.user_id = parsedBody.user_id

      next()
      return true
    } catch (error) {
      return next(error)
    }
  })
}
