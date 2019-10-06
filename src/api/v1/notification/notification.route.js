const express = require('express');
const validate = require('express-validation');
const controller = require('./notification.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();


router
  .route('/')
  .get(authorize(), controller.get);


module.exports = router;
