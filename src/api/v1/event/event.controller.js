const httpStatus = require('http-status');
const Event = require('./event.model');
const Follow = require('../follow/follow.model');
const { handler: errorHandler } = require('../../middlewares/error');

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
 * Get home page post
 * @public
 */
exports.getHomePageEvents = async (req, res, next) => {
  try {
    const { user } = req;
    const { page, perPage } = req.query;
    const followers = Follow.getFollowers(user.id);
    const followeeIds = followers.map(o => o.followeeId);
    const events = Event.list({ userId: { $in: followeeIds }, page, perPage });
    res.json(events);
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
