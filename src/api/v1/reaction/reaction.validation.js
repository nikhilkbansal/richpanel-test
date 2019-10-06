const Joi = require('joi');
// const Post = require('./post.model');
const Reaction = require('./reaction.model');

module.exports = {

  postReaction: {
    body: {
      reaction: Joi.string().required().valid(Reaction.reactionsEnum),
      itemId: Joi.string().required(),
      itemType: Joi.string().required().valid(Reaction.itemTypes),
    },
  },

  removeReaction: {
    body: {
      itemId: Joi.string().required(),
    },
  },

};
