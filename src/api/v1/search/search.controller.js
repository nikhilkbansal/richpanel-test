const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Post = require('../post/post.model');
const Event = require('../event/event.model');
const User = require('../user/user.model');
const Follow = require('../follow/follow.model');
const { handler: errorHandler } = require('../../middlewares/error');
// const APIError = require('../../utils/APIError');
// const { sendMail } = require('../../services/mailProviders');
// const uuidv4 = require('uuid/v4');


/**
 * Create new user
 * @public
 */
exports.getSearch = async (req, res, next) => {
  try {
    const {
      term, type, page, perPage,
    } = req.query;
    let posts = [];
    let events = [];
    let ngos = [];

    switch (type) {
      case 'post':
        posts = Post.list({ title: `/${term}/`, page, perPage });
        break;

      case 'event':
        events = Event.list({ title: `/${term}/`, page, perPage });
        break;

      case 'ngo':
        ngos = User.list({
          role: 'ngo', name: `/${term}/`, page, perPage,
        });
        break;

      default:
        break;
    }


    res.json({ posts, events, ngos });
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};
