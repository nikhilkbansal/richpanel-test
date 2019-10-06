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
const reactionsEnum = ['love', 'like', 'insightFul', 'sad', 'celebrate'];
const itemTypes = ['event', 'post', 'comment'];

const reactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  itemType: {
    type: String,
    enum: itemTypes,
  },
  reaction: {
    type: String,
    required: true,
    enum: reactionsEnum,
  },
  status: {
    type: String,
  },
}, {
  timestamps: true,
});

reactionSchema.statics = {
  reactionsEnum,
  itemTypes,
  async removeReaction({
    userId, itemId,
  }) {
    const options = {
      userId, itemId,
    };
    return this.updateOne(options, { status: 'inActive' });
  },
  async addReaction({
    reaction, userId, itemId, itemType,
  }) {
    const options = {
      userId, itemId, itemType,
    };
    const pastReaction = await this.findOne(options);
    if (pastReaction) {
      if (pastReaction.reaction === reaction && pastReaction.status === 'active') {
        pastReaction.status = 'inActive';
      } else {
        pastReaction.status = 'active';
        pastReaction.reaction = reaction;
      }
      return pastReaction.save();
    }
    return this.create({
      userId, itemId, reaction, itemType, status: 'active',
    });
  },

  async howUserReacted(userId, itemId, itemType = 'post') {
    const reactions = await this.findOne({
      userId, itemId, itemType, status: 'active',
    });
    if (reactions) {
      return reactions.reaction;
    }
    return false;
  },

  async findReactionsCounts(itemId) {
    const reactions = await this.find({ itemId, status: 'active' });
    const likeCount = reactions.filter(o => o.reaction === 'like').length;
    const loveCount = reactions.filter(o => o.reaction === 'love').length;
    const celebrateCount = reactions.filter(o => o.reaction === 'celebrate').length;
    const sadCount = reactions.filter(o => o.reaction === 'sad').length;
    const insightFulCount = reactions.filter(o => o.reaction === 'insightFul').length;

    const allReactions = {
      likeCount,
      loveCount,
      celebrateCount,
      sadCount,
      insightFulCount,
    };
    const sortedAllReactions =
      Object.keys(allReactions).sort((a, b) => allReactions[a] - allReactions[b]);
    const topThreeReactions = [];
    sortedAllReactions.forEach((o) => {
      if (allReactions[o] !== 0 && topThreeReactions.length < 3) {
        topThreeReactions.push(o.replace('Count', ''));
      }
    });

    return {
      reactionsCount: reactions.length,
      topThreeReactions,
      allReactions,
    };
  },
};

module.exports = mongoose.model('Reaction', reactionSchema);
