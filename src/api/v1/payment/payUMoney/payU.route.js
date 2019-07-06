const express = require('express');
const validate = require('express-validation');
const controller = require('./payU.controller');
const {
  makePayment,
  paymentResponse,
  refundPayment,
} = require('./payU.validation');
const { authorize } = require('../../../middlewares/auth');

const router = express.Router();


/**
 * @api {post} v1/payU/makePayment make payment
 * @apiDescription make payment
 * @apiVersion 1.0.0
 * @apiName payU make payment
 * @apiGroup payment
 * @apiPermission user
 *
 * @apiParam  {String}  name              Name of user
 * @apiParam  {String}  [description]     description
 * @apiParam  {String}  brandId           brandId
 * @apiParam  {String}  startDate         start date in unix timestamp
 * @apiParam  {String}  endDate           End date in unix timestamp
 * @apiParam  {String}  budget            Budget
 * @apiParam  {String}  [noOfAdvertisement]  no of advertisement
 *
 * @apiSuccess {Object}  campaign     Created compaign
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Conflict 409)  ValidationError  A campaign with same name already exists
 */
router.route('/makePayment')
  .post(validate(makePayment), controller.makePayment);

/**
 * @api {post} v1/payU/paymentResponse get payment response
 * @apiDescription payment response
 * @apiVersion 1.0.0
 * @apiName payU get payment response
 * @apiGroup payment
 * @apiPermission user
 *
 * @apiParam  {String}  name              Name of user
 * @apiParam  {String}  [description]     description
 * @apiParam  {String}  brandId           brandId
 * @apiParam  {String}  startDate         start date in unix timestamp
 * @apiParam  {String}  endDate           End date in unix timestamp
 * @apiParam  {String}  budget            Budget
 * @apiParam  {String}  [noOfAdvertisement]  no of advertisement
 *
 * @apiSuccess {Object}  campaign     Created compaign
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Conflict 409)  ValidationError  A campaign with same name already exists
 */
router.route('/paymentResponse')
  .post(controller.paymentResponse);
/**
 * @api {post} v1/payU/refundPayment get payment refund
 * @apiDescription payment refund
 * @apiVersion 1.0.0
 * @apiName payU get payment refund
 * @apiGroup payment
 * @apiPermission user
 *
 * @apiParam  {String}  name              Name of user
 * @apiParam  {String}  [description]     description
 * @apiParam  {String}  brandId           brandId
 * @apiParam  {String}  startDate         start date in unix timestamp
 * @apiParam  {String}  endDate           End date in unix timestamp
 * @apiParam  {String}  budget            Budget
 * @apiParam  {String}  [noOfAdvertisement]  no of advertisement
 *
 * @apiSuccess {Object}  campaign     Created compaign
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Conflict 409)  ValidationError  A campaign with same name already exists
 */
router.route('/refundPayment')
  .post(validate(refundPayment), controller.refundPayment);
/**
 * @api {post} v1/payU/refundPayment get payment refund
 * @apiDescription payment refund
 * @apiVersion 1.0.0
 * @apiName payU get payment refund
 * @apiGroup payment
 * @apiPermission user
 *
 * @apiParam  {String}  name              Name of user
 * @apiParam  {String}  [description]     description
 * @apiParam  {String}  brandId           brandId
 * @apiParam  {String}  startDate         start date in unix timestamp
 * @apiParam  {String}  endDate           End date in unix timestamp
 * @apiParam  {String}  budget            Budget
 * @apiParam  {String}  [noOfAdvertisement]  no of advertisement
 *
 * @apiSuccess {Object}  campaign     Created compaign
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Conflict 409)  ValidationError  A campaign with same name already exists
 */
router.route('/refundStatus')
  .post(controller.refundStatus);

module.exports = router;
