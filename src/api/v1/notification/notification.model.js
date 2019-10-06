const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

/**
 * Post Schema
 * @private
 */
const notificationTypes = ['event', 'post', 'comment'];

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
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
      .populate('userId', 'name _id picture')
      .limit(perPage)
      .exec();
  },

};

module.exports = mongoose.model('Notification', notificationSchema);
