const CashFree = require('./../../../services/cashFreeProviders');
const Subscription = require('./subscription.model');
const APIError = require('../../../utils/APIError');

exports.list = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.list({ ...req.query });
    res.json(subscriptions);
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
