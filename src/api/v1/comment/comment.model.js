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


const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },


}, {
  timestamps: true,
});

commentSchema.statics = {
  async list({
    page = 1, perPage = 30, _id, postId,
  }) {
    const options = omitBy({
      _id, postId,
    }, isNil);
    return this.find(options).sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

};

module.exports = mongoose.model('Comment', commentSchema);
