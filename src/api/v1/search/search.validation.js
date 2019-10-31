const Joi = require('joi');

module.exports = {

  // GET /v1/search
  getSearch: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      term: Joi.any(),
      itemId: Joi.string(),
      type: Joi.string().valid(['all', 'ngo', 'post', 'event']).default('post'),
    },
  },

  // GET /v1/search/recommendation/posts
  postsRecommendation: {
    query: {
      skip: Joi.number(),
      perPage: Joi.number().min(1).max(100),
    },
  },
};
