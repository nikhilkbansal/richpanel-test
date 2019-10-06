const express = require('express');
const validate = require('express-validation');
const controller = require('./comment.controller');
const { authorize } = require('../../middlewares/auth');
// const { admin: ADMIN, loggedInUser: LOGGED_USER } = require('../../../config/vars');
const {
  postComment,
  deleteComment,
  listComments,
  likeUnlike,
} = require('./comment.validation');

const router = express.Router();


router
  .route('/')

  /**
   * @api {post} v1/comment Create comment
   * @apiDescription Create a new comment
   * @apiVersion 1.0.0
   * @apiName Createcomment
   * @apiGroup User
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
  .post(authorize(), validate(postComment), controller.post)
/**
   * @api {post} v1/comment list comments
   * @apiDescription list comments
   * @apiVersion 1.0.0
   * @apiName Listcomment
   * @apiGroup User
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
  .get(authorize(), validate(listComments), controller.list);


router
  .route('/likeUnlike').post(authorize(), validate(likeUnlike), controller.likeUnlike);

router
  .route('/:commentId')

/**
   * @api {patch} v1/comment/:commentId Delete comment
   * @apiDescription Delete a comment
   * @apiVersion 1.0.0
   * @apiName Deletecomment
   * @apiGroup comment
   * @apiPermission comment
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .delete(authorize(), validate(deleteComment), controller.remove);


module.exports = router;
