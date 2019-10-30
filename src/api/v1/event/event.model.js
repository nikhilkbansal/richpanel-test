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
 * Event Schema
 * @private
 */


const eventSchema = new mongoose.Schema({
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
  files: {
    type: Array,
    default: [],
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
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

eventSchema.index({ title: 'text', description: 'text' });

eventSchema.statics = {
  async list({
    page = 1, perPage = 30, _id, userId, title, $text, endTime,
  }) {
    const options = omitBy({
      _id, userId, title, $text, endTime,
    }, isNil);
    return this.find(options).sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .populate('userId', 'name _id picture')
      .exec();
  },

};


module.exports = mongoose.model('Event', eventSchema);
