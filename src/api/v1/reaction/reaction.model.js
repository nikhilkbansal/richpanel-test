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
* User Roles
*/

/**
 * Post Schema
 * @private
 */
const reactions = ['A', 'B', 'C', 'D', 'E'];


const reactionSchema = new mongoose.Schema({
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
  reaction: {
    type: String,
    required: true,
    enum: reactions,
  },
  status: {
    type: String,

  },


}, {
  timestamps: true,
});

reactionSchema.statistics = {
  async addReaction({
    reaction, userId, postId,
  }) {
    const options = {
      userId, postId,
    };
    const pastReaction = this.findOne(options);
    if (pastReaction) {
      if (pastReaction === reaction) {
        this.status = 'INACTIVE';
      } else {
        this.status = 'ACTIVE';
        this.reaction = reaction;
      }
      return this.save();
    }
    return this.create({
      userId, postId, reaction, status: 'ACTIVE',
    });
  },

};

module.exports = mongoose.model('Reaction', reactionSchema);
