const express = require('express');
const validate = require('express-validation');
const controller = require('./reaction.controller');
const { authorize } = require('../../middlewares/auth');
// const { admin: ADMIN, loggedInUser: LOGGED_USER } = require('../../../config/vars');
const {
  postReaction, removeReaction,

} = require('./reaction.validation');

const router = express.Router();


router
  .route('/')

  /**
   * @api {post} v1/reaction Create reaction
   * @apiDescription Create a new reaction
   * @apiVersion 1.0.0
   * @apiName CreateReaction
   * @apiGroup Reaction
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             _id     id of a specific comment
   * @apiParam  {String{6..128}}     postId  id of a specific post
   * @apiParam  {String{..128}}      comment    specific comment on the post
   *
   * @apiSuccess (Created 201) {String}  comment/list of comments
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .post(authorize(), validate(postReaction), controller.post)
  .delete(authorize(), validate(removeReaction), controller.remove);


module.exports = router;
