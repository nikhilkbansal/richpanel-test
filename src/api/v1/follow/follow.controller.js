const httpStatus = require('http-status');
const User = require('../user/user.model');
const follow = require('./follow.model');
const notification = require('../notification/notification.controller');

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
    const followResult = await follow.add(followeeId, followerId);

    await notification.sendNotification({
      type: 'newFollower',
      receiverId: followeeId,
      senderId: user._id,
    });

    res.status(httpStatus.CREATED);
    res.json({ isFollowed: followResult.isActive });
  } catch (error) {
    next(error);
  }
};


exports.list = async (req, res, next) => {
  try {
    const { query, user } = req;
    const condition = query.followeeId && query.followerId
      ? query
      : { ...query, followerId: user._id };
    const follows = await follow.list({ isActive: true, ...condition });

    const resultedFollows = await Promise.map(follows, async (item) => {
      const followerCount = await follow.count({ followeeId: item.followeeId, isActive: true });
      return {
        followerCount,
        ...item.toObject(),
      };
    });
    res.json(resultedFollows);
  } catch (error) {
    next(error);
  }
};
