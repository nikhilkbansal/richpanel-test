

const Joi = require('joi');

module.exports = {


  makePayment: {
    body: {
      email: Joi.string().email().required(),
      amount: Joi.string().required(),
      productinfo: Joi.string().required(),
      firstname: Joi.string().required(),
      phoneno: Joi.string().required(),
      lastname: Joi.string(),

    },
  },
  refundPayment: {
    body: {
      amount: Joi.string().required(),
    },
  },

};
