const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');


const itemTypes = ['post', 'event'];
const contactUs = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    trim: true,
  },
  email: String,
  name: String,
}, {
  timestamps: true,
});

contactUs.statics = {
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

module.exports = mongoose.model('contactUs', contactUs);
