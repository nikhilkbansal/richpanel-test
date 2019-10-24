const Joi = require('joi');
// const Post = require('./post.model');

module.exports = {

  // GET /v1/post
  listPosts: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      _id: Joi.string(),
    },
  },

  // POST /v1/post
  createPost: {
    body: {
      files: Joi.array(),
      title: Joi.string().required(),
      description: Joi.string(),
      location: Joi.string(),
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
