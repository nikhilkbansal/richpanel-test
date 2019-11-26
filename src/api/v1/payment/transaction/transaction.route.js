const express = require('express');
const validate = require('express-validation');
const controller = require('./transaction.controller');
const {
  list,
  update,
} = require('./transaction.validation');
const { authorize } = require('../../../middlewares/auth');

const router = express.Router();


router.route('/')
  .get(authorize(), validate(list), controller.list)
  .patch(authorize(), validate(update), controller.update);


module.exports = router;
