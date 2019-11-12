

const Joi = require('joi');

module.exports = {
  list: {
    query: {
      senderId: Joi.string(),
      receiverId: Joi.string(),
      skip: Joi.number(),
    },
  },
  cancel: {
    body: {
      _id: Joi.string(),
    },
  },
};
