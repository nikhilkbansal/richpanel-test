const Joi = require('joi');
const Comment = require('./contactUs.model');

module.exports = {
  post: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      message: Joi.string().required(),
    },
  },

};
