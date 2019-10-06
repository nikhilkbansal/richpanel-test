const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Notification = require('./notification.model');
// const APIError = require('../../utils/APIError');
// const { sendMail } = require('../../services/mailProviders');
// const uuidv4 = require('uuid/v4');


/**
 * Add post to database.
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const { user } = req;
    const notifications = await Notification.list({ userId: user._id });
    res.status(httpStatus.CREATED);
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};


exports.remove = async (req, res, next) => {
  const { user } = req;

  Reaction.removeReaction({ ...req.body, userId: user._id })
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(error => next(error));
};
