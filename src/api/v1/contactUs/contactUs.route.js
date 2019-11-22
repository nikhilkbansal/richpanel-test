const express = require('express');
const validate = require('express-validation');
const controller = require('./contactUs.controller');
const { authorize } = require('../../middlewares/auth');
// const { admin: ADMIN, loggedInUser: LOGGED_USER } = require('../../../config/vars');
const {
  post,
} = require('./contactUs.validation');

const router = express.Router();


router
  .route('/')
  .post(authorize(), validate(post), controller.post);

module.exports = router;
