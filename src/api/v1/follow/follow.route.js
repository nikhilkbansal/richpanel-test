const express = require('express');
const validate = require('express-validation');
const controller = require('./follow.controller');
const { authorize } = require('../../middlewares/auth');
// const { admin: ADMIN, loggedInUser: LOGGED_USER } = require('../../../config/vars');
const {
  followUnfollow,


} = require('./follow.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
  .route('/')

  /**
   * @api {post} v1/follow follow/unfollow User
   * @apiDescription follow or unfollow any user
   * @apiVersion 1.0.0
   * @apiName follow/unfollow User
   * @apiGroup Follow
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}         followeeId     followeeId
   *
   * @apiSuccess (Created 201)
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .post(authorize(), validate(followUnfollow), controller.follow);

module.exports = router;
