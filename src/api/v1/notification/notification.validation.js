const Joi = require('joi');

module.exports = {


  getNotification: {
    query: {
      skip: Joi.number().min(0),
      perPage: Joi.number().min(1).max(100),
    },
  },

};
