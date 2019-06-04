const express = require('express');
const controller = require('./files.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} v1/files/ Upload file
   * @apiDescription Upload file
   * @apiVersion 1.0.0
   * @apiName uploadFile
   * @apiGroup Files
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {file}               file           file
   * @apiParam  {String=video,image} fileType       type of image
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(), controller.create);

router
  .route('/:_id')
  /**
   * @api {get} v1/files/:_id Get upload file
   * @apiDescription Upload file
   * @apiVersion 1.0.0
   * @apiName getFile
   * @apiGroup Files
   * @apiPermission public
   *
   * @apiParam  {number}             width       desire width
   * @apiParam  {number}             height      desire height
   * @apiParam  {string=png,jpg}     format      desire format

   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .get(controller.getImage);

module.exports = router;
