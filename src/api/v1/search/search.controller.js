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
    const all = [];
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
        posts = await Post.list({
          $text: { $search: term }, ...filteredCauseSupported, page, perPage, score: { $meta: 'textScore' },
        });
        events = await Event.list({
          $text: { $search: term }, ...filteredCauseSupported, page, perPage, score: { $meta: 'textScore' },
        });
        if (filterCauseSupported && type !== 'ngo') {
          filteredCauseSupported = { causeSupported: filterCauseSupported };
        }
        ngos = await User.list({
          role: 'ngo', $text: { $search: term }, page, perPage, ...filteredCauseSupported, score: { $meta: 'textScore' },
        });

        break;

      case 'post':
        posts = await Post.list({
          $text: { $search: term }, ...filteredCauseSupported, page, perPage, score: { $meta: 'textScore' },
        });
        break;

      case 'event':
        events = await Event.list({
          $text: { $search: term }, ...filteredCauseSupported, page, perPage, score: { $meta: 'textScore' },
        });
        break;

      case 'ngo':
        if (filterCauseSupported && type !== 'ngo') {
          filteredCauseSupported = { causeSupported: filterCauseSupported };
        }
        ngos = await User.list({
          role: 'ngo', $text: { $search: term }, page, perPage, ...filteredCauseSupported, score: { $meta: 'textScore' },
        });
        break;

      default:
    }

    res.json({
      posts, events, ngos,
    });
  } catch (error) {
    next(error);
  }
};


exports.postsRecommendation = async (req, res, next) => {
  try {
    const { user, query } = req;
    const followers = await Follow.getFollowers(user.id);
    const followeeIds = followers.map(o => o.followeeId);
    const posts = await Post.list({
      userId: { $nin: followeeIds },
      ...query,
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

exports.eventsRecommendation = async (req, res, next) => {
  try {
    const { user, query } = req;
    const followers = await Follow.getFollowers(user.id);
    const followeeIds = followers.map(o => o.followeeId);
    const events = await Event.list({
      userId: { $nin: followeeIds },
      ...query,
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

exports.poRecommendation = async (req, res, next) => {
  try {
    const { user, query } = req;
    const followers = await Follow.getFollowers(user.id);
    const followeeIds = followers.map(o => o.followeeId);
    const users = await User.list({
      ...query,
      userId: { $nin: followeeIds },
      role: 'ngo',
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

