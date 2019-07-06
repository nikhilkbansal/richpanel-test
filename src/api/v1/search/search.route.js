const express = require('express');
const validate = require('express-validation');
const controller = require('./search.controller');
const { authorize } = require('../../middlewares/auth');
// const { admin: ADMIN, loggedInUser: LOGGED_USER } = require('../../../config/vars');

const {
  getSearch,
} = require('./search.validation');

const router = express.Router();

router.param('postId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/search Search posts, events, ngos
   * @apiDescription Get a list of searched items
   * @apiVersion 1.0.0
   * @apiName Search
   * @apiGroup Search
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Per page
   * @apiParam  {String}             [term]       Search term
   * @apiParam  {String}             [type=]      type
   *
   * @apiSuccess {Object[]} users List of searched items.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), validate(getSearch), controller.getSearch);
