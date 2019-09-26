const httpStatus = require('http-status');
const User = require('../user/user.model');
const follow = require('./follow.model');

const { handler: errorHandler } = require('../../middlewares/error');


/**
 * Add user to req.locals.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * follow/unfollow a user
 * @public
 */
exports.follow = async (req, res, next) => {
  try {
    const { followeeId } = req.body;
    const { user } = req;
    const followerId = user._id;
    await follow.add(followeeId, followerId);
    res.status(httpStatus.CREATED);
    res.json();
  } catch (error) {
    next(error);
  }
};

