const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Post = require('./post.model');
const Follow = require('../follow/follow.model');
const User = require('../user/user.model');
const Share = require('../share/share.model');
const Reaction = require('../reaction/reaction.model');
const Comment = require('../comment/comment.model');
const { handler: errorHandler } = require('../../middlewares/error');
// const APIError = require('../../utils/APIError');
// const { sendMail } = require('../../services/mailProviders');
// const uuidv4 = require('uuid/v4');

/**
 * Load Post and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);
    req.locals = { post };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Add post to database.
 * @public
 */
exports.add = async (req, res, next) => {
  try {
    const { user } = req;
    const post = new Post({ ...req.body, userId: user._id });
    const savePost = await post.save();
    res.status(httpStatus.CREATED);
    res.json(savePost);
  } catch (error) {
    next(error);
  }
};

/**
 * List posts
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const posts = await Post.list(req.query);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * Update any old post
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const newPost = Object.assign(req.locals.post, req.body);
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    next(error);
  }
};


/**
 * Get preferenced posts
 * @public
 */
exports.getPreferencedPosts = async (req, res, next) => {
  try {
    const { user } = req;
    const { page, perPage } = req.query;
    let posts;
    if (user.preferences.length > 0) {
      const users = User.getNGOByCause(user.preferences);
      const userIds = users.map(o => o.id);

      posts = Post.list({ userId: { $in: userIds }, page, perPage });
    } else {
      posts = Post.list({ page, perPage });
    }
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * Get home page post
 * @public
 */
exports.getHomePagePosts = async (req, res, next) => {
  try {
    const { user } = req;
    const { page, perPage } = req.query;
    const followers = await Follow.getFollowees(user.id);
    if (!followers || followers.length === 0) {
      res.json([]);
      return;
    }
    const followeeIds = followers.map(o => o.followeeId);
    const posts = Post.list({
      userId: { $in: followeeIds },
      $or: [{ campaignEndDate: { $gte: new Date() } },
        { campaignEndDate: { $exists: false } }],
      page,
      perPage,
    });
    // const posts = await Post.list({ page, perPage });
    const resultedPosts = await Promise.map(posts, async (post, index) => {
      const postsCount = await Reaction.findReactionsCounts(post._id);
      const howUserReacted = await Reaction.howUserReacted(user._id, post._id);
      const comment = await Comment.list({ perPage: 1, itemId: post._id, itemType: 'post' });
      const shares = await Share.getShares({ itemId: post._id, userId: user._id });
      return {
        comment,
        ...post.toObject(),
        ...postsCount,
        howUserReacted,
        sharesCount: shares.length,
        isFollowed: true,
      };
    });
    res.json(resultedPosts);
  } catch (error) {
    next(error);
  }
};


exports.remove = (req, res, next) => {
  const { post } = req.locals;

  post.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(error => next(error));
};
