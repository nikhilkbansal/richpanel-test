const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

/**
 * Files Schema
 * @private
 */
const filesSchema = new mongoose.Schema({
  _id: { type: String },
  userId: { type: String, ref: 'User' },
  isTemp: { type: Boolean, default: false },
  tempLocation: { type: String },
  fileOriginalName: { type: String },
  fileType: { type: String, default: 'image', enum: ['video', 'image', 'pdf'] },
  fileSize: { type: Number, default: 0 },
  fileMimeType: { type: String },
  fileExtension: { type: String },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
filesSchema.pre('save', async (next) => {

});

/**
 * Methods
 */
filesSchema.method({

});

/**
 * Statics
 */
filesSchema.statics = {
  async list({
    skip = 0, perPage = 30, _id,
  }, sort = { createdAt: -1 }) {
    const options = omitBy({
      _id,
    }, isNil);
    return this.find(options)
      .sort(sort)
      .skip(skip)
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Files', filesSchema);
