// const httpStatus = require('http-status');
// const { omit } = require('lodash');
const User = require('../user/user.model');
const follow = require('./follow.model');

const { handler: errorHandler } = require('../../middlewares/error');
// const APIError = require('../../utils/APIError');
// const { sendMail } = require('../../services/mailProviders');
// const uuidv4 = require('uuid/v4');


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
    const { user } = req.locals;
    const followerId = user._id;
    const followUnfollow = await follow.add(followeeId, followerId);
    res.json(followUnfollow);
  } catch (error) {
    next(error);
  }
};

