

const Joi = require('joi');

module.exports = {


  makePayment: {
    body: {
      email: Joi.string().email().required(),
      amount: Joi.number().required(),
      productinfo: Joi.string().required(),
      firstname: Joi.string().required(),
      phone: Joi.string().required(),
      lastname: Joi.string(),

    },
  },
  refundPayment: {
    body: {
      amount: Joi.string().required(),
    },
  },

};
