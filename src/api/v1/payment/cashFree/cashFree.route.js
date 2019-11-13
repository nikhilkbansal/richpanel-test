const express = require('express');
const validate = require('express-validation');
const controller = require('./cashFree.controller');
const {
  getCfToken,
  createAndSubscribePlan,
  verifySubscription,
  saveTransaction,
  addPayoutBeneficiary,
} = require('./cashFree.validation');
const { authorize } = require('../../../middlewares/auth');

const router = express.Router();


router.route('/getCfToken')
  .get(authorize(), validate(getCfToken), controller.getCfToken);


router.route('/createAndSubscribePlan')
  .post(authorize(), validate(createAndSubscribePlan), controller.createAndSubscribePlan);

router.route('/verifySubscription')
  .post(authorize(), validate(verifySubscription), controller.verifySubscription);

router.route('/saveTransaction')
  .post(authorize(), validate(saveTransaction), controller.saveTransaction);


router.route('/addPayoutBeneficiary')
  .post(authorize(), validate(addPayoutBeneficiary), controller.addPayoutBeneficiary);


module.exports = router;
