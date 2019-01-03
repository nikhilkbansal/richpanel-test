const mongoose = require('mongoose');
// const httpStatus = require('http-status');
// const { omitBy, isNil } = require('lodash');
// const bcrypt = require('bcryptjs');
// const moment = require('moment-timezone');
// const jwt = require('jwt-simple');
// const uuidv4 = require('uuid/v4');
// const APIError = require('../../utils/APIError');
// const { env, jwtSecret, jwtExpirationInterval } = require('../../../config/vars');


/**
 * follow Schema
 * @private
 */


const followSchema = new mongoose.Schema({
  followeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,

});
followSchema.statics = {

  /**
   * Add follow/unfollow relation if not exists already. If exists, only update previous values
   *
   * @param {Object} followeeId - id of the person to be followed.
   * @param {Object} followerId - id of the follower.
   * @returns {Promise<Channel>} created relation
   */
  async add(followeeId, followerId) {
    let existingrelation = await this.findOne({ followeeId, followerId });
    const newrelation = {
      followeeId,
      followerId,
      isActive: !existingrelation.isActive,
    };
    if (existingrelation) {
      existingrelation = Object.assign(existingrelation, newrelation);
      return existingrelation.save();
    }
    return this.create(newrelation);
  },
};
module.exports = mongoose.model('Follow', followSchema);
