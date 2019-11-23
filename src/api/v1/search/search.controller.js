const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Post = require('../post/post.model');
const Event = require('../event/event.model');
const User = require('../user/user.model');
const Follow = require('../follow/follow.model');
const Share = require('../share/share.model');
const Reaction = require('../reaction/reaction.model');
const Comment = require('../comment/comment.model');
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
      term, type, perPage, skip, filterCauseSupported, itemId,
    } = req.query;
    const { user } = req;
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
          $text: { $search: term }, ...filteredCauseSupported, userId: { $nin: [user.id] }, skip, perPage, score: { $meta: 'textScore' },
        });
        events = await Event.list({
          $text: { $search: term }, ...filteredCauseSupported, userId: { $nin: [user.id] }, skip, perPage, score: { $meta: 'textScore' },
        });
        if (filterCauseSupported && type !== 'ngo') {
          filteredCauseSupported = { causeSupported: filterCauseSupported };
        }
        ngos = await User.list({
          role: 'ngo', $text: { $search: term }, _id: { $nin: [user.id] }, skip, perPage, ...filteredCauseSupported, score: { $meta: 'textScore' },
        });

        break;

      case 'post': {
        const singleItemCondition = itemId ? { _id: itemId } : { $text: { $search: term } };
        posts = await Post.list({
          ...filteredCauseSupported, ...singleItemCondition, userId: { $nin: [user.id] }, skip, perPage, score: { $meta: 'textScore' },
        });
        break; }

      case 'event': {
        const singleItemCondition = itemId ? { _id: itemId } : { $text: { $search: term } };
        events = await Event.list({
          ...filteredCauseSupported, ...singleItemCondition, userId: { $nin: [user.id] }, skip, perPage, score: { $meta: 'textScore' },
        });
        break;
      }
      case 'ngo':
        if (filterCauseSupported && type !== 'ngo') {
          filteredCauseSupported = { causeSupported: filterCauseSupported };
        }
        ngos = await User.list({
          role: 'ngo', $text: { $search: term }, _id: { $nin: [user.id] }, skip, perPage, ...filteredCauseSupported, score: { $meta: 'textScore' },
        });
        break;

      default:
    }

    if (type === 'post') {
      posts = await Promise.map(posts, async (post) => {
        const isFollowedByMe = await Follow.list({ followeeId: post.userId, followerId: user.id });
        const postsCount = await Reaction.findReactionsCounts(post._id);
        const howUserReacted = await Reaction.howUserReacted(user._id, post._id);
        const comment = await Comment.list({ perPage: 1, itemId: post._id, itemType: 'post' });
        const shares = await Share.getShares({ itemId: post._id, userId: user._id });
        return {
          comment,
          ...post,
          ...postsCount,
          howUserReacted,
          sharesCount: shares.length,
          isFollowed: isFollowedByMe.length > 0,
        };
      });
    }

    if (type === 'event') {
      events = await Promise.map(events, async (event) => {
        const isFollowedByMe = await Follow.list({ followeeId: event.userId, followerId: user.id });
        const postsCount = await Reaction.findReactionsCounts(event._id);
        const howUserReacted = await Reaction.howUserReacted(user._id, event._id);
        const comment = await Comment.list({ perPage: 1, itemId: event._id, itemType: 'event' });
        const shares = await Share.getShares({ itemId: event._id, userId: user._id });
        return {
          comment,
          ...event,
          ...postsCount,
          howUserReacted,
          sharesCount: shares.length,
          isFollowed: isFollowedByMe.length > 0,
        };
      });
    }

    if (type === 'ngo') {
      ngos = await Promise.map(ngos, async (ngo) => {
        const isFollowedByMe = await Follow.list({ followeeId: ngo._id, followerId: user.id });
        return {
          ...ngo.toObject(),
          isFollowedByMe: isFollowedByMe.length > 0,
        };
      });
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
    const followers = await Follow.getFollowees(user.id);
    const followeeIds = followers.map(o => o.followeeId);
    console.log('followeeIds', followeeIds);
    const posts = await Post.list({
      userId: { $nin: [...followeeIds, user.id] },
      $or: [{ campaignEndDate: { $gte: new Date() } },
        { campaignEndDate: { $exists: false } }],
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
    const followers = await Follow.getFollowees(user.id);
    const followeeIds = followers.map(o => o.followeeId);
    const events = await Event.list({
      userId: { $nin: [...followeeIds, user.id] },
      endTime: { $gte: new Date() },
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
    const followers = await Follow.getFollowees(user.id);
    console.log(followers);
    const followeeIds = followers.map(o => o.followeeId);
    const users = await User.list({
      ...query,
      _id: { $nin: [...followeeIds, user.id] },
      role: 'ngo',
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

