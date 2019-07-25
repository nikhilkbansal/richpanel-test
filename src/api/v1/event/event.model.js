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
    maxlength: 128,
  },
  uploads: {
    type: String,
    default: '',

  },
  location: {
    type: String,
  },
  interestedIn: {
    type: Number,
    default: 0,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },

}, {
  timestamps: true,
});


eventSchema.statistics = {
  async list({
    page = 1, perPage = 30, _id, userId, title,
  }) {
    const options = omitBy({
      _id, userId, title,
    }, isNil);
    return this.find(options).sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};


module.exports = mongoose.model('Event', eventSchema);
