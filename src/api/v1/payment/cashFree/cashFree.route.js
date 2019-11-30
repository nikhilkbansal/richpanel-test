const express = require('express');
const validate = require('express-validation');
const controller = require('./cashFree.controller');
const {
  getCfToken,
  createAndSubscribePlan,
  verifySubscription,
  saveTransaction,
  addPayoutBeneficiary,
  deletePayoutBeneficiary,
  requestTransfer,
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

router.route('/getPayoutBeneficiary')
  .get(authorize(), controller.getPayoutBeneficiary);

router.route('/addPayoutBeneficiary')
  .post(authorize(), validate(addPayoutBeneficiary), controller.addPayoutBeneficiary);

router.route('/requestTransfer')
  .post(authorize(), validate(requestTransfer), controller.requestTransfer);


router.route('/removePayoutBeneficiary')
  .delete(authorize(), validate(deletePayoutBeneficiary), controller.removePayoutBeneficiary);


module.exports = router;
