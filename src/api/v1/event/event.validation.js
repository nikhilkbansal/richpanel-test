const Joi = require('joi');
// const Post = require('./post.model');

module.exports = {

  // GET /v1/event
  listEvent: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      _id: Joi.string(),
    },
  },

  // POST /v1/event
  createEvent: {
    body: {
      files: Joi.array().required(),
      title: Joi.string().required().max(50),
      description: Joi.string().max(128),
      location: Joi.string(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
    },
  },

  updateEvent: {
    body: {
      file: Joi.string(),
      title: Joi.string().max(50),
      description: Joi.string().max(128),
      location: Joi.string(),
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
    },
  },

};
