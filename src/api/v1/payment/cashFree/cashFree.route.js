const express = require('express');
const validate = require('express-validation');
const controller = require('./cashFree.controller');
const {
  getCfToken,
  createAndSubscribePlan,
  saveTransaction,
} = require('./cashFree.validation');
const { authorize } = require('../../../middlewares/auth');

const router = express.Router();


router.route('/getCfToken')
  .get(validate(getCfToken), controller.getCfToken);


router.route('/createAndSubscribePlan')
  .post(validate(createAndSubscribePlan), controller.createAndSubscribePlan);

router.route('/saveTransaction')
  .post(validate(saveTransaction), controller.saveTransaction);


module.exports = router;
