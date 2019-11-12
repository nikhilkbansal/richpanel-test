const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');


const subscriptionSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId, // Always PO's id
    ref: 'User',
  },
  plan: {
    planId: String,
    planName: String,
    intervalType: String,
    intervals: String,
    description: String,
    type: String,
    amount: Number,
  },
  subscription: {
    subscriptionId: String,
    planId: String,
    customerEmail: String,
    customerPhone: String,
    paymentOption: String,
    card_number: String,
    subReferenceId: String,
    status: String,
    currentCycle: String,
  },
  status: {
    type: String,
    enum: ['cancelled', 'running', 'error'],
    default: 'running',
  },
}, {
  timestamps: true,
});

subscriptionSchema.statics = {

  add(transaction) {
    return this.create({
      ...transaction,
    });
  },

  async list({
    skip = 0, perPage = 30, _id, senderId, receiverId, txStatus,
  }, sort = { createdAt: -1 }) {
    const options = omitBy({
      _id, senderId, receiverId, txStatus,
    }, isNil);
    return this.find(options).sort(sort)
      .skip(skip)
      .populate('senderId', 'name userName _id picture')
      .populate('receiverId', 'name userName _id picture')
      .limit(perPage)
      .exec();
  },
};


module.exports = mongoose.model('PaymentSubscription', subscriptionSchema);
