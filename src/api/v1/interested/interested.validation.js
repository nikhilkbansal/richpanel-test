const Joi = require('joi');

module.exports = {
  // POST /v1/interested/
  toggleInterested: {
    body: {
      isInterested: Joi.string().required(),
      eventId: Joi.string().required(),
    },
  },
};
