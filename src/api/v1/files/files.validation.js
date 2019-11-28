const Joi = require('joi');

module.exports = {
  list: {
    query: {
      ids: Joi.array(),
    },
  },
};
