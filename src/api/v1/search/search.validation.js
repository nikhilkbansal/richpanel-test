const Joi = require('joi');

module.exports = {

  // GET /v1/search
  getSearch: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      term: Joi.string(),
      type: Joi.string().valid(['all', 'ngo', 'post', 'event']).default('post'),
    },
  },
};
