const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

/**
 * Notification Schema
 * @private
 */


const notificationTypes = [
  'newDonationAttatchment',
  'newRecurringDonation',
  'newDonation',
  'newComment',
  'newCommentReply',
  'newFollower',
];

const notificationSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notification: {
    type: String,
  },
  meta: {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    paymentSubscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentSubscription',
    },
  },
  type: {
    type: String,
    enum: notificationTypes,
  },
}, {
  timestamps: true,
});

notificationSchema.statics = {
  notificationTypes,
  async add(userId, notification, type) {
    return this.create({
      userId, notification, type,
    });
  },


  async list({
    skip = 0, perPage = 30, type, userId,
  }, sort = { createdAt: -1 }) {
    const options = omitBy({
      type, userId,
    }, isNil);
    return this.find(options).sort(sort)
      .skip(skip)
      .populate('receiverId', 'name _id picture role')
      .limit(perPage)
      .exec();
  },

};

module.exports = mongoose.model('Notification', notificationSchema);
