const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../../config/vars');


/**
 * User Schema
 * @private
 */
const searchLogsSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    enum: ['user', 'event', 'post'],
  },
}, {
  timestamps: true,
});

/**
 * Statics
 */
searchLogsSchema.statics = {
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', searchLogsSchema);
