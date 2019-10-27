const express = require('express');
const validate = require('express-validation');
const controller = require('./event.controller');
const { authorize, authorizeEvent } = require('../../middlewares/auth');
// const { admin: ADMIN, loggedInUser: LOGGED_USER } = require('../../../config/vars');
const {
  createEvent,
  updateEvent,
  listEvent,
} = require('./event.validation');

const router = express.Router();

router.param('eventId', controller.load);

router
  .route('/homepageEvents')
  /**
   * @api {get} v1/posts/homepagePosts List homepage events
   * @apiDescription Get a list of homepage events
   * @apiVersion 1.0.0
   * @apiName ListHomePageEvents
   * @apiGroup event
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   *
   * @apiSuccess {Object[]} events List of events.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), controller.getHomePageEvents);


router
  .route('/')

  /**
   * @api {event} v1/event Create event
   * @apiDescription Create a new event
   * @apiVersion 1.0.0
   * @apiName CreateEvent
   * @apiGroup User
   * @apiPermission User
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             file     event's image/video
   * @apiParam  {String{6..128}}     title  event's title
   * @apiParam  {String{..128}}      description    event's decription
   * @apiParam  {String=user,admin}  location    event's location
   *
   * @apiSuccess (Created 201) {String}  file     event's image/video
   * @apiSuccess (Created 201) {String}  title  event's title
   * @apiSuccess (Created 201) {String}  description    event's decription
   * @apiSuccess (Created 201) {String} location    event's location
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .get(authorize(), validate(listEvent), controller.list)
  .post(authorize(), validate(createEvent), controller.add);

router
  .route('/:eventId')
  /**
   * @api {patch} v1/event/:eventId Update event
   * @apiDescription Update some fields of a event document
   * @apiVersion 1.0.0
   * @apiName Updateevent
   * @apiGroup event
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             file     event's image/video
   * @apiParam  {String{6..128}}     title  event's title
   * @apiParam  {String{..128}}      description    event's decription
   * @apiParam  {String=user,admin}  location    event's location
   *
   * @apiSuccess (Created 201) {String}  file     event's image/video
   * @apiSuccess (Created 201) {String}  title  event's title
   * @apiSuccess (Created 201) {String}  description    event's decription
   * @apiSuccess (Created 201) {String} location    event's location
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .patch(authorize(), authorizeEvent, validate(updateEvent), controller.update)
/**
   * @api {patch} v1/event/:eventId Delete event
   * @apiDescription Delete a event
   * @apiVersion 1.0.0
   * @apiName Deleteevent
   * @apiGroup event
   * @apiPermission event
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .delete(authorize(), authorizeEvent, controller.remove);


module.exports = router;
