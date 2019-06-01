const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Comment = require('./comment.model');
// const APIError = require('../../utils/APIError');
// const { sendMail } = require('../../services/mailProviders');
// const uuidv4 = require('uuid/v4');


/**
 * Add post to database.
 * @public
 */
exports.post = async (req, res, next) => {
  try {
    const { user } = req;
    const comment = new Comment({ ...req.body, userId: user._id });
    const postComment = await comment.save();
    res.status(httpStatus.CREATED);
    res.json(postComment);
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const commentList = await Comment.list(req.query);
    res.json(commentList);
  } catch (error) {
    next(error);
  }
};


exports.remove = async (req, res, next) => {
  const { commentId } = req.query;
  const comment = await Comment.findById(commentId);
  comment.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(error => next(error));
};
