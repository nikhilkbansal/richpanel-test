const Joi = require('joi');

module.exports = {
  list: {
    query: {
      skip: Joi.number(),
      perPage: Joi.number(),
      _id: Joi.string(),
      senderId: Joi.string(),
      receiverId: Joi.string(),
      postId: Joi.string(),
      txStatus: Joi.string(),
    },
  },
};
