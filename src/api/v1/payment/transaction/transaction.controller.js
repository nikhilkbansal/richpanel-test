// const { generateOrderId } = require('../../../utils/universalFunctions');
// const CashFree = require('./../../../services/cashFreeProviders');
// const Post = require('./../../post/post.model');
// const APIError = require('../../../utils/APIError');
// const httpStatus = require('http-status');
const { Transaction } = require('../transaction/transaction.model');

exports.list = async (req, res, next) => {
  try {
    const transactions = await Transaction.list({ ...req.query });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};
