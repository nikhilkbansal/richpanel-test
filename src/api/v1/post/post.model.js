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
    maxlength: 128,
  },
  files: {
    type: Array,
    default: [],

  },
  location: {
    type: String,
  },

}, {
  timestamps: true,
});

postSchema.index({ title: 'text', description: 'text' });

postSchema.statistics = {
  async list({
    page = 1, perPage = 30, _id, userId, title, $text,
  }) {
    const options = omitBy({
      _id, userId, title, $text,
    }, isNil);
    return this.find(options).sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

module.exports = mongoose.model('Post', postSchema);
