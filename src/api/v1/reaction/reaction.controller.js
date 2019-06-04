const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Reaction = require('./reaction.model');
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
    const postReaction = Reaction.addReaction({ ...req.body, userId: user._id });
    res.status(httpStatus.CREATED);
    res.json(postReaction);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  const { commentId } = req.query;
  const comment = await Reaction.findById(commentId);
  comment.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(error => next(error));
};
