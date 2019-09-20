const Joi = require('joi');
// const Post = require('./post.model');
const Reaction = require('./reaction.model');

module.exports = {

  postReaction: {
    body: {
      reaction: Joi.string().required().valid(Reaction.reactionsEnum),
      postId: Joi.string().required(),
    },
  },

  removeReaction: {
    body: {
      postId: Joi.string().required(),
    },
  },

};
