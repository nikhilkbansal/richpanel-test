

const Joi = require('joi');
const Transaction = require('./transaction.model');

module.exports = {

  getCfToken: {
    query: {
      orderAmount: Joi.number().required(),
      orderCurrency: Joi.string().required(),

    },
  },
  createAndSubscribePlan: {
    body: {
      amount: Joi.number().required(),
      intervalType: Joi.string().required(),
      customerEmail: Joi.string().required(),
      customerPhone: Joi.string().required(),
      cardNumber: Joi.number().required(),
      cardExpiryMonth: Joi.string().required(),
      cardExpiryYear: Joi.string().required(),
      cardCvv: Joi.number().required(),
      cardHolder: Joi.string().required(),
    },
  },

  saveTransaction: {
    body: {
      postId: Joi.string().optional(),
      amount: Joi.number().required(),
      orderId: Joi.string().required(),
      txType: Joi.string().required().valid(Transaction.txTypes),
    },
  },


};
