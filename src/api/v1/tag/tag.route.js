const express = require('express');
const validate = require('express-validation');
const controller = require('./tag.controller');
const {
  list,
  add,
} = require('./tag.validation');

const router = express.Router();


router
  .route('/')

  /**
   * @api {get} v1/tag List/Search tags
   * @apiDescription List or search tags
   * @apiVersion 1.0.0
   * @apiName  ListTag
   * @apiGroup Tag
   * @apiPermission public
   *
   * @apiParam  {String}     tag     tag
   *
   * @apiSuccess (Success 200) {Object[]}  array of tag
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  .get(validate(list), controller.list)

  /**
   * @api {post} v1/tag Add tag
   * @apiDescription Add tag
   * @apiVersion 1.0.0
   * @apiName  AddTag
   * @apiGroup Tag
   * @apiPermission public
   *
   * @apiParam  {String}     tag     tag
   *
   * @apiSuccess (Created 201)
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  .post(validate(add), controller.add);

module.exports = router;
