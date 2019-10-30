const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

// const httpStatus = require('http-status');
// const { omitBy, isNil } = require('lodash');
// const bcrypt = require('bcryptjs');
// const moment = require('moment-timezone');
// const jwt = require('jwt-simple');
// const uuidv4 = require('uuid/v4');
// const APIError = require('../../utils/APIError');
// const { env, jwtSecret, jwtExpirationInterval } = require('../../../config/vars');

/**
* User Roles
*/

/**
 * Post Schema
 * @private
 */


const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  raisedMoney: {
    type: Number,
    default: 0,
  },
  campaignGoal: String,
  campaignStartDate: Date,
  campaignEndDate: Date,
  files: {
    type: Array,
    default: [],
  },
  location: {
    longLat: Array,
    landmarkFlatNo: String,
    city: String,
    country: String,
  },

}, {
  timestamps: true,
});

postSchema.index({ title: 'text', description: 'text' });

postSchema.statics = {
  async updateRaisedMoney(_id, raisedMoney) {
    return this.updateOne({ _id }, { $inc: { raisedMoney } });
  },
  async list({
    skip = 0, perPage = 30, _id, userId, title, $text, $or,
  }) {
    const options = omitBy({
      _id, userId, title, $text, $or,
    }, isNil);
    return this.find(options).sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .populate('userId', 'name _id picture')
      .exec();
  },

};

module.exports = mongoose.model('Post', postSchema);
