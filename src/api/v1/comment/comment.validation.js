const Joi = require('joi');
// const Post = require('./post.model');

module.exports = {

  // GET /v1/post
  listComments: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      postId: Joi.string(),
      _id: Joi.string(),
    },
  },

  // POST /v1/post
  postComment: {
    body: {
      comment: Joi.string().required(),
      postId: Joi.string().required(),
    },
  },

  deleteComment: {
    query: {
      commentId: Joi.string().required(),

    },
  },

};
