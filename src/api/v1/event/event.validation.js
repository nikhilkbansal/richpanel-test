const Joi = require('joi');
// const Post = require('./post.model');

module.exports = {

  // GET /v1/event
  listEvent: {
    query: {
      skip: Joi.number(),
      perPage: Joi.number().min(1).max(100),
      _id: Joi.string(),
      userId: Joi.string(),
    },
  },

  // POST /v1/event
  createEvent: {
    body: {
      isRepost: Joi.bool(),
      repostOf: Joi.string(),
      files: Joi.array(),
      title: Joi.string().max(50),
      description: Joi.string(),
      location: Joi.string(),
      startTime: Joi.string(),
      endTime: Joi.string(),
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

  repost: {
    body: {
      eventId: Joi.string().required(),
      description: Joi.string(),
    },
  },
};
