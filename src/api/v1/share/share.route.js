const express = require('express');
const validate = require('express-validation');
const controller = require('./share.controller');
const { authorize } = require('../../middlewares/auth');
// const { admin: ADMIN, loggedInUser: LOGGED_USER } = require('../../../config/vars');
const {
  add,

} = require('./share.validation');

const router = express.Router();


router
  .route('/')

  /**
   * @api {post} v1/share Create share
   * @apiDescription Create a new share
   * @apiVersion 1.0.0
   * @apiName AddShare
   * @apiGroup Share
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String=ngo,event,post}        itemType item type
   * @apiParam  {String         itemId   id of a specific post
   *
   * @apiSuccess (Created 201) {String}  comment/list of comments
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .post(authorize(), validate(add), controller.add);


module.exports = router;
