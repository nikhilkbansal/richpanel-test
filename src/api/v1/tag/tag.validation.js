const Joi = require('joi');
// const Post = require('./post.model');

module.exports = {

  // POST /v1/tag
  add: {
    body: {
      tag: Joi.string().required(),

    },
  },

  // GET /v1/tag
  list: {
    query: {
      tag: Joi.string().required(),

    },
  },

};
