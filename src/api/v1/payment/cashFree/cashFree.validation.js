

const Joi = require('joi');
const { Transaction } = require('../transaction/transaction.model');

module.exports = {
  getCfToken: {
    query: {
      orderAmount: Joi.number().required(),
      orderCurrency: Joi.string().required(),
    },
  },
  verifySubscription: {
    body: {
      _id: Joi.string().required(),
    },
  },
  deletePayoutBeneficiary: {
    body: {
      bankId: Joi.string().required(),
    },
  },
  createAndSubscribePlan: {
    body: {
      poId: Joi.string().required(),
      amount: Joi.number().required(),
      expiresOn: Joi.string().required(),
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
  addPayoutBeneficiary: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      bankAccount: Joi.string().required(),
      ifsc: Joi.string().required(),
      vpa: Joi.string().optional(),
      cardNo: Joi.string().optional(),
      address1: Joi.string().required(),
      address2: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      pincode: Joi.string().optional(),
    },
  },

  saveTransaction: {
    body: {
      postId: Joi.string().optional(),
      receiverId: Joi.string().optional(),
      orderId: Joi.string().required(),
      txData: Joi.string().required(),
      txType: Joi.string().required().valid(Transaction.txTypes),
    },
  },


};
