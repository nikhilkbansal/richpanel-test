const CashFree = require('./../../../services/cashFreeProviders');
const Subscription = require('./subscription.model');
const { Transaction } = require('../transaction/transaction.model');
const APIError = require('../../../utils/APIError');

exports.list = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.list({ ...req.query });
    const subscriptionsWithTransactions = await Promise.map(subscriptions, async (subscription) => {
      const transactions = await Transaction.list({
        perPage: 100,
        txType: 'subscriptionToPO',

      });

      const totalAmount = transactions.reduce((prev, cur) => prev + cur.amount, 0);
      return {
        transactions,
        ...subscription.toObject(),
        totalAmount: totalAmount || 0,
      };
    });
    res.json(subscriptionsWithTransactions);
  } catch (error) {
    next(error);
  }
};


exports.cancel = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(res.body._id);
    if (!subscription) {
      throw new APIError({ message: 'Subscription not found' });
    }
    await CashFree.cancelSubscriptions(subscription.subscription.subscriptionId);
    subscription.status = 'cancelled';
    await subscription.save();
    res.json();
  } catch (error) {
    next(error);
  }
};
