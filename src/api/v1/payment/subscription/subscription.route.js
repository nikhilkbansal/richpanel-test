const express = require('express');
const validate = require('express-validation');
const controller = require('./subscription.controller');
const {
  list,
  cancel,
} = require('./subscription.validation');
const { authorize } = require('../../../middlewares/auth');

const router = express.Router();


router.route('/')
  .get(authorize(), validate(list), controller.list);

router.route('/cancel')
  .post(authorize(), validate(cancel), controller.cancel);


module.exports = router;
