const express = require('express');
const validate = require('express-validation');
const controller = require('./post.controller');
const { authorize, authorizePost } = require('../../middlewares/auth');
// const { admin: ADMIN, loggedInUser: LOGGED_USER } = require('../../../config/vars');
const {
  createPost,
  updatePost,
  listPosts,
  repost,
} = require('./post.validation');

const router = express.Router();

router.param('postId', controller.load);

router
  .route('/homepagePosts')
  /**
   * @api {get} v1/posts/homepagePosts List homepage posts
   * @apiDescription Get a list of homepage posts
   * @apiVersion 1.0.0
   * @apiName ListHomePagePosts
   * @apiGroup Post
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   *
   * @apiSuccess {Object[]} posts List of posts.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), controller.getHomePagePosts);


router
  .route('/preferencePosts')
  /**
   * @api {get} v1/posts/homepagePosts List homepage posts
   * @apiDescription Get a list of homepage posts
   * @apiVersion 1.0.0
   * @apiName ListHomePagePosts
   * @apiGroup Post
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   *
   * @apiSuccess {Object[]} posts List of posts.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), controller.getPreferencedPosts);


router
  .route('/')

  /**
   * @api {post} v1/post Create Post
   * @apiDescription Create a new post
   * @apiVersion 1.0.0
   * @apiName CreatePost
   * @apiGroup User
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             file     post's image/video
   * @apiParam  {String{6..128}}     title  post's title
   * @apiParam  {String{..128}}      description    post's decription
   * @apiParam  {String=user,admin}  location    post's location
   *
   * @apiSuccess (Created 201) {String}  file     post's image/video
   * @apiSuccess (Created 201) {String}  title  post's title
   * @apiSuccess (Created 201) {String}  description    post's decription
   * @apiSuccess (Created 201) {String} location    post's location
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .get(authorize(), validate(listPosts), controller.list)
  .post(authorize(), validate(createPost), controller.add);

router
  .route('/repost')
  .post(authorize(), validate(repost), controller.repost);

router
  .route('/:postId')
  /**
   * @api {patch} v1/post/:postId Update Post
   * @apiDescription Update some fields of a Post document
   * @apiVersion 1.0.0
   * @apiName UpdatePost
   * @apiGroup Post
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             file     post's image/video
   * @apiParam  {String{6..128}}     title  post's title
   * @apiParam  {String{..128}}      description    post's decription
   * @apiParam  {String=user,admin}  location    post's location
   *
   * @apiSuccess (Created 201) {String}  file     post's image/video
   * @apiSuccess (Created 201) {String}  title  post's title
   * @apiSuccess (Created 201) {String}  description    post's decription
   * @apiSuccess (Created 201) {String} location    post's location
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .patch(authorize(), authorizePost, validate(updatePost), controller.update)
/**
   * @api {patch} v1/post/:postId Delete post
   * @apiDescription Delete a post
   * @apiVersion 1.0.0
   * @apiName Deletepost
   * @apiGroup post
   * @apiPermission post
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .delete(authorize(), authorizePost, controller.remove);


module.exports = router;
