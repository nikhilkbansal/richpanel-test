const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');


const itemTypes = ['post', 'event'];
const commentSchema = new mongoose.Schema({
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
  // replies: replySchema,
  repliedTo: String,
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

commentSchema.statics = {
  itemTypes,
  updateLikes(_id, isLiked) {
    let updateCondition = { $inc: { likes: -1 } };
    if (isLiked) {
      updateCondition = { $inc: { likes: 1 } };
    }
    return this.updateOne({ _id }, updateCondition);
  },


  async list({
    skip = 0, perPage = 30, _id, itemId, repliedTo, itemType,
  }, sort = { createdAt: -1 }) {
    const options = omitBy({
      _id, itemId, repliedTo, itemType,
    }, isNil);
    return this.find(options).sort(sort)
      .skip(skip)
      .populate('userId', 'name _id picture')
      .limit(perPage)
      .exec();
  },

};

module.exports = mongoose.model('Comment', commentSchema);
