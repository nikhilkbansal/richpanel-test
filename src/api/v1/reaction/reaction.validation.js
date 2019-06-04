const Joi = require('joi');
// const Post = require('./post.model');

module.exports = {

  // POST /v1/post
  postReaction: {
    body: {
      reaction: Joi.string().required(),
      postId: Joi.string().required(),
    },
  },

};
