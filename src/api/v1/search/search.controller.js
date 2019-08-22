const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Post = require('../post/post.model');
const Event = require('../event/event.model');
const User = require('../user/user.model');
const Follow = require('../follow/follow.model');
const { handler: errorHandler } = require('../../middlewares/error');


/**
 * Get search
 * @public
 *
 * @TODO Other factors to consider: How many times a searched item opened, views of items, location where item searched.
*/
exports.getSearch = async (req, res, next) => {
  try {
    const {
      term, type, page, perPage, filterCauseSupported,
    } = req.query;
    let all = [];
    let posts = [];
    let events = [];
    let ngos = [];
    let filteredCauseSupported = {};
    if (filterCauseSupported && type !== 'ngo') {
      ngos = User.list({
        role: 'ngo', causeSupported: filterCauseSupported,
      });
      filteredCauseSupported = { userId: ngos.map(o => o._id) };
    }


    switch (type) {
      case 'all':
        posts = Post.list({
          $text: { $search: term }, ...filteredCauseSupported, page, perPage, score: { $meta: 'textScore' },
        });
        events = Event.list({
          $text: { $search: term }, ...filteredCauseSupported, page, perPage, score: { $meta: 'textScore' },
        });
        if (filterCauseSupported && type !== 'ngo') {
          filteredCauseSupported = { causeSupported: filterCauseSupported };
        }
        ngos = User.list({
          role: 'ngo', $text: { $search: term }, page, perPage, ...filteredCauseSupported, score: { $meta: 'textScore' },
        });
        all = [...posts, ...events, ...ngos].sort((a, b) => a.textScore - b.textScore);
        break;

      case 'post':
        posts = Post.list({
          $text: { $search: term }, ...filteredCauseSupported, page, perPage, score: { $meta: 'textScore' },
        });
        break;

      case 'event':
        events = Event.list({
          $text: { $search: term }, ...filteredCauseSupported, page, perPage, score: { $meta: 'textScore' },
        });
        break;

      case 'ngo':
        if (filterCauseSupported && type !== 'ngo') {
          filteredCauseSupported = { causeSupported: filterCauseSupported };
        }
        ngos = User.list({
          role: 'ngo', $text: { $search: term }, page, perPage, ...filteredCauseSupported, score: { $meta: 'textScore' },
        });
        break;

      default:
    }

    res.json({
      all, posts, events, ngos,
    });
  } catch (error) {
    next(error);
  }
};
