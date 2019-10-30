const httpStatus = require('http-status');
const Event = require('./event.model');
const Follow = require('../follow/follow.model');
const User = require('../user/user.model');
const Share = require('../share/share.model');
const Reaction = require('../reaction/reaction.model');
const Comment = require('../comment/comment.model');
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
 * List events
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const posts = await Event.list(req.query);
    res.json(posts);
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
    const followers = await Follow.getFollowees(user.id);
    console.log('followers', followers);
    if (!followers || followers.length === 0) {
      res.json([]);
      return;
    }
    const followeeIds = followers.map(o => o.followeeId);
    const events = await Event.list({
      userId: { $in: followeeIds }, endTime: { $gte: new Date() }, page, perPage,
    });
    // const events = await Event.list({ page, perPage });
    const resultedEvents = await Promise.map(events, async (event, index) => {
      const eventsCount = await Reaction.findReactionsCounts(event._id);
      const howUserReacted = await Reaction.howUserReacted(user._id, event._id);
      const comment = await Comment.list({ perPage: 1, itemId: event._id, itemType: 'event' });
      const shares = await Share.getShares({ itemId: event._id, userId: user._id });
      return {
        comment,
        ...event.toObject(),
        ...eventsCount,
        howUserReacted,
        sharesCount: shares.length,
        isFollowed: true,
      };
    });
    res.json(resultedEvents);
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
