const mongoose = require('mongoose');


/**
 * Share Schema
 * @private
 */
const shareType = ['post', 'event', 'ngo'];


const shareSchema = new mongoose.Schema({
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
    required: true,
    enum: shareType,
  },
  sharedOn: {
    type: String,
  },
}, {
  timestamps: true,
});


shareSchema.statics = {
  shareType,
  async addShare({
    itemType,
    itemId,
    userId,
  }) {
    return this.create({
      itemType,
      itemId,
      userId,
    });
  },

  async getShares({
    itemId,
    userId,
  }) {
    return this.find({
      itemId,
      userId,
    });
  },

};

module.exports = mongoose.model('Share', shareSchema);
