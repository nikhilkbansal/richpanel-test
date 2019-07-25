const express = require('express');
const validate = require('express-validation');
const controller = require('./interested.controller');
const { authorize } = require('../../middlewares/auth');
const {
  toggleInterested,
} = require('./interested.validation');

const router = express.Router();

/**
 * @api {post} v1/interested/ Toggle intestedin
 * @apiDescription  Mark 'interested in' or 'not interested in' for a event
 * @apiVersion 1.0.0
 * @apiName Interestedin
 * @apiGroup Interstedin
 * @apiPermission user
 *
 * @apiParam  {Boolean} isInterested     Is interested or not
 * @apiParam  {String}  eventid          Event's id
 *
 * @apiSuccess (Created 200)
 *
 * @apiError (Bad Request 500)  InternalServerError  Some conditions not met
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/')
  .post(authorize(), validate(toggleInterested), controller.toggleInterested);

module.exports = router;
