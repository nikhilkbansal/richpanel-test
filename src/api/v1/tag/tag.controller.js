// const httpStatus = require('http-status');
// const { omit } = require('lodash');
const User = require('../user/user.model');
const Tag = require('./tag.model');

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
 */
exports.add = async (req, res, next) => {
  try {
    const { tag } = req.body;
    const { user } = req;
    const tags = Tag.find({ $text: { $search: tag } });

    const tagSaved = new Tag({ userId: user.id, tag });
    tagSaved.save();


    res.json();
  } catch (error) {
    next(error);
  }
};

