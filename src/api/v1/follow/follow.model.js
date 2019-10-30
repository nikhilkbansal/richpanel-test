const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const User = require('../user/user.model');
/**
 * follow Schema
 * @private
 */


const followSchema = new mongoose.Schema({
  followeeId: { // the user who is followed by followerId
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followerId: { // the user who follows
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
      isActive: true,
    };
    if (existingrelation) {
      newrelation.isActive = !existingrelation.isActive;
      existingrelation = Object.assign(existingrelation, newrelation);
      if (newrelation.isActive) {
        await User.updateOne({ _id: followeeId }, { $inc: { followerCount: 1 } });
      } else {
        await User.updateOne({ _id: followeeId }, { $inc: { followerCount: -1 } });
      }

      return existingrelation.save();
    }
    await User.updateOne({ _id: followeeId }, { $inc: { followerCount: 1 } });
    return this.create(newrelation);
  },

  getFollowees(followerId) {
    return this.find({ followerId, isActive: true }).sort({ createdAt: -1 });
  },


  async list({
    skip = 0, perPage = 30, _id, followeeId, followerId, isActive = true,
  }, sort = { createdAt: -1 }) {
    const options = omitBy({
      _id, followeeId, followerId, isActive,
    }, isNil);
    return this.find(options).sort(sort)
      .skip(skip)
      .populate('followeeId', 'name userName _id picture')
      .populate('followerId', 'name userName _id picture')
      .limit(perPage)
      .exec();
  },
};
module.exports = mongoose.model('Follow', followSchema);
