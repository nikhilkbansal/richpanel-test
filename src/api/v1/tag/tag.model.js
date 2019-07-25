const mongoose = require('mongoose');

/**
 * follow Schema
 * @private
 */


const tagSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,

});

tagSchema.index({ tag: 'text' });

tagSchema.statics = {

  async search(tag) {
    return this.find({ $text: { $search: tag } });
  },

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

  getFollowers(followerId) {
    return this.find({ followerId }).sort({ createdAt: -1 });
  },


};
module.exports = mongoose.model('Tag', tagSchema);
