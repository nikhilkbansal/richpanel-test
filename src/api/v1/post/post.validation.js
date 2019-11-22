const Joi = require('joi');
// const Post = require('./post.model');

module.exports = {

  // GET /v1/post
  listPosts: {
    query: {
      skip: Joi.number(),
      perPage: Joi.number().min(1).max(100),
      _id: Joi.string(),
      userId: Joi.string(),
    },
  },

  // POST /v1/post
  createPost: {
    body: {
      files: Joi.array(),
      // title: Joi.string().optional(),
      description: Joi.string(),
      location: Joi.string(),
      isRepost: Joi.bool(),
      repostOf: Joi.string(),
      type: Joi.string(),
    },
  },
  repost: {
    body: {
      postId: Joi.string().required(),
      description: Joi.string(),
    },
  },
  updatePost: {
    body: {
      title: Joi.string().max(50),
      description: Joi.string().max(128),
      location: Joi.string(),
    },
  },

};
