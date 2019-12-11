const moment = require('moment-timezone');
const { jwtExpirationInterval, twitterConfig, jwtSecret } = require('../../../config/vars');
const request = require('request');
const jwt = require('jwt-simple');

exports.twitterReverse = async (req, res, next) => {
  try {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        consumer_key: twitterConfig.consumerKey,
        consumer_secret: twitterConfig.consumerSecret,
      },
      form: {
        oauth_callback: 'http://127.0.0.1:3000',
      }
    }, (err, r, body) => {
      console.log("err", err, body);

      if (err) {
        return res.send(500, { message: err.message });
      }

      const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      console.log(jsonStr)
      res.send(JSON.parse(jsonStr));
    });
  } catch (error) {
    return next(error);
  }
};


exports.twitterAuthToken = async (req, res, next) => {
  try {
    const playload = {
      exp: moment().add(jwtExpirationInterval,'days').unix(),
      iat: moment().unix(),
      sub: req.body.user_id,
      ...req.body,
    };
    req.token = jwt.encode(playload, jwtSecret);

    res.setHeader('x-auth-token', req.token);

    return res.status(200).send();
  } catch (error) {
    console.log('errpr', error)
    return next(error);
  }
};

exports.twitterAuth = async (req, res, next) => {
  request.post({
    url: `https://api.twitter.com/oauth/access_token`,
    oauth: {
      consumer_key: twitterConfig.consumerKey,
      consumer_secret: twitterConfig.consumerSecret,
      oauth_token: req.body.oauth_token,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: { oauth_verifier: req.body.oauth_verifier,oauth_token: req.body.oauth_token }
  }, (err, r, body) => {
    try {
      console.log('err, body', err,  body ,req.body);
      if (err) {
        return res.send(500, { message: err.message });
      }

      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.body.oauth_token = parsedBody.oauth_token;
      req.body.oauth_token_secret = parsedBody.oauth_token_secret;
      req.body.user_id = parsedBody.user_id;

      next();
      return true;
    } catch (error) {
      return next(error);
    }
  });
  
};
