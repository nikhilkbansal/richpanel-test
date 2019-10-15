const Joi = require('joi');
// const Post = require('./post.model');

module.exports = {


  // POST /v1/follow
  followUnfollow: {
    body: {
      followeeId: Joi.string().required(),
    },
  },
  list: {
    query: {
      skip: Joi.number(),
      followeeId: Joi.string(),
      followerId: Joi.string(),
    },
  },
};
