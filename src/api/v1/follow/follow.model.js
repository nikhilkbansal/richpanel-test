const mongoose = require('mongoose');

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
      isActive: true,
    };
    if (existingrelation) {
      newrelation.isActive = !existingrelation.isActive;
      existingrelation = Object.assign(existingrelation, newrelation);
      return existingrelation.save();
    }
    return this.create(newrelation);
  },

  getFollowers(followerId) {
    return this.find({ followerId }).sort({ createdAt: -1 });
  },


};
module.exports = mongoose.model('Follow', followSchema);
