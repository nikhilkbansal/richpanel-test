const mongoose = require('mongoose');

/**
 * follow Schema
 * @private
 */


const tagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,

});

tagSchema.index({ tag: 'text' });

tagSchema.statics = {

  list({
    page = 1, perPage = 30, tag,
  }) {
    return this.find({ $text: { $search: tag } }).sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  async add(tag) {
    let tagData = await this.findOne({ tag });
    if (!tagData) {
      tagData = this.create({ tag });
    }
    return tagData;
  },

};

module.exports = mongoose.model('Tag', tagSchema);
