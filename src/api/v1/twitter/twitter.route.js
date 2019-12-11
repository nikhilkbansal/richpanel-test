const express = require('express');
const controller = require('./twitter.controller');

const { authorize } = require('../../middlewares/auth');

const router = express.Router();


router.route('/userInfo')
  .get(authorize, controller.getUserInfo);

router.route('/getTweets')
  .get(authorize, controller.getTweets);

router.route('/postReplies')
  .post(authorize, controller.postReplies);

module.exports = router;
