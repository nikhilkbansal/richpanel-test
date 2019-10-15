const express = require('express');
const validate = require('express-validation');
const controller = require('./notification.controller');
const { authorize } = require('../../middlewares/auth');
// const { admin: ADMIN, loggedInUser: LOGGED_USER } = require('../../../config/vars');
const {
  getNotification
} = require('./notification.validation');

const router = express.Router();


router
  .route('/')
  .get(authorize(), validate(getNotification), controller.post)


module.exports = router;
