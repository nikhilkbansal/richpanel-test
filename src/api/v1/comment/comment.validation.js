const Joi = require('joi');
const Comment = require('./comment.model');

module.exports = {

  listComments: {
    query: {
      skip: Joi.number().min(0),
      perPage: Joi.number().min(1).max(100),
      itemId: Joi.string(),
      repliedTo: Joi.string(),
      itemType: Joi.string().required().valid(Comment.itemTypes),
      _id: Joi.string(),
    },
  },

  postComment: {
    body: {
      comment: Joi.string().required(),
      itemId: Joi.string().required(),
      itemType: Joi.string().required().valid(Comment.itemTypes),
      repliedTo: Joi.string().optional(),
    },
  },

  likeUnlike: {
    body: {
      _id: Joi.string().required(),
      isLiked: Joi.bool().required(),
    },
  },
  deleteComment: {
    query: {
      commentId: Joi.string().required(),

    },
  },

};
