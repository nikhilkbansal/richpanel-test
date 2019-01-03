const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Event = require('./event.model');
const { handler: errorHandler } = require('../../middlewares/error');
// const APIError = require('../../utils/APIError');
// const { sendMail } = require('../../services/mailProviders');
// const uuidv4 = require('uuid/v4');

/**
 * Load Event and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const event = await Event.findById(id);
    req.locals = { event };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Add event to database.
 * @public
 */
exports.add = async (req, res, next) => {
  try {
    const { user } = req;
    const event = new Event({ ...req.body, userId: user._id });
    const savePost = await event.save();
    res.status(httpStatus.CREATED);
    res.json(savePost);
  } catch (error) {
    next(error);
  }
};

/**
 * Update any old event
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const newEvent = Object.assign(req.locals.event, req.body);
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (error) {
    next(error);
  }
};

/**
 * Remove any old event
 * @public
 */
exports.remove = (req, res, next) => {
  const { event } = req.locals;

  event.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(error => next(error));
};
