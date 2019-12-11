const express = require('express');
const controller = require('./auth.controller');
const oAuthLogin = require('../../middlewares/auth').oAuth;

const router = express.Router();

router.route('/twitter')
  .post(controller.twitterAuth, oAuthLogin('twitter-token'), controller.twitterAuthToken);

router.route('/twitter/reverse')
  .post(controller.twitterReverse);


module.exports = router;
