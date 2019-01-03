const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Post = require('./post.model');
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

exports.remove = (req, res, next) => {
  const { post } = req.locals;

  post.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(error => next(error));
};
