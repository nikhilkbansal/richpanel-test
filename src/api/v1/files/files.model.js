const mongoose = require('mongoose');

/**
 * Files Schema
 * @private
 */
const filesSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  isTemp: { type: Boolean, default: false },
  tempLocation: { type: String },
  fileOriginalName: { type: String },
  fileType: { type: String, default: 'image', enum: ['video', 'image'] },
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

};

/**
 * @typedef User
 */
module.exports = mongoose.model('Files', filesSchema);
