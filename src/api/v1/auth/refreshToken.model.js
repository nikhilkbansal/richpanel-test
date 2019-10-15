const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment-timezone');

/**
 * Client Meta Schema
 * @private
 */
const clientMeta = new mongoose.Schema({
  deviceToken: {
    type: String,
    default: '',
  },
});

/**
 * Refresh Token Schema
 * @private
 */
const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: 'String',
    ref: 'User',
    required: true,
  },
  clientType: {
    type: 'String',
    ref: 'User',
    enum: ['browser', 'ios', 'android'],
    default: 'browser',
  },
  clientMeta,
  isLogout: {
    type: 'Boolean',
    default: false,
  },
  logoutDate: { type: Date },
  expires: { type: Date },
}, {
  timestamps: true,
});

refreshTokenSchema.statics = {

  /**
   * Generate a refresh token object and saves/updates it into the database
   *
   * @param {User} user
   * @returns {RefreshToken}
   */
  async generate(user, refreshTokenId = null) {
    let tokenObject;
    const userId = user._id;
    const userEmail = user.email;
    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(30, 'days').toDate();

    // If RefreshToken._id is already present then just update else add new document
    if (refreshTokenId) {
      tokenObject = await RefreshToken.findOneAndUpdate({ _id: refreshTokenId }, {
        token, userEmail, expires,
      }, { new: true }).exec();
    } else {
      tokenObject = new RefreshToken({
        token, userId, userEmail, expires, clientType: user.clientType, 'clientMeta.deviceToken': user.deviceToken,
      });
      tokenObject.save();
    }
    // console.log('tokenObject', tokenObject);
    return tokenObject;
  },
};

/**
 * @typedef RefreshToken
 */
const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;
