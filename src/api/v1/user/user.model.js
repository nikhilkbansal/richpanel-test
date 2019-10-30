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
* User Roles
*/
const roles = ['user', 'admin', 'ngo'];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  forgotPasswordKey: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  services: {
    facebook: String,
    google: String,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  picture: {
    type: String,
  },
  followerCount: {
    type: Number,
    default: 0,
  },
  googleAuth: {
    access_token: String,
    refresh_token: String,
    scope: String,
    token_type: String,
    expiry_date: Number,
  },
  poInfo: {
    publicPhone: String,
    publicEmail: String,
    about: String,
    founded: String,
    website: String,
    causeSupported: String,
    carousel: {
      type: Array,
      default: [],
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});


userSchema.index({ name: 'text', tags: 'text', userName: 'text' });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'followerCount', 'userName', 'isActive', 'picture', 'poInfo', 'role', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const playload = {
      exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(playload, jwtSecret);
  },
  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

/**
 * Statics
 */
userSchema.statics = {

  roles,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
  /**
  * Get user
  *
  * @param {emailID} email - The emailID of user.
  * @returns {Promise<User, APIError>}
  */
  async getUser(filter) {
    try {
      const user = await this.findOne(filter).exec();
      if (user) {
        return user;
      }
      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    const {
      userName, password, refreshObject, email,
    } = options;
    if (!userName) throw new APIError({ message: 'Email/Username is required to login' });

    const user = await this.findOne({ $or: [{ userName }, { email: userName }] }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (password) {
      if (user && await user.passwordMatches(password)) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect username/email or password';
    } else if (refreshObject && refreshObject.userEmail === email) {
      if (refreshObject.isLogout || moment(refreshObject.expires).isBefore()) {
        err.message = 'Refresh token expired or user is not loggedin.';
      } else {
        return { user, accessToken: user.token() };
      }
    } else {
      err.message = 'Incorrect email or refreshToken';
    }
    throw new APIError(err);
  },


  async list({
    skip = 0, perPage = 30, _id, $text, causeSupported, role,
  }) {
    const options = omitBy({
      _id, $text, causeSupported, role,
    }, isNil);
    console.log(options);
    return this.find(options).sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();
  },

  getNGOByCause(causeSupported) {
    return this.find({ causeSupported: { $in: causeSupported } }).sort({ createdAt: -1 })
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error error instance
   * @returns {Error|APIError} returns specific error
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'email',
          location: 'body',
          messages: ['"email" already exists'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

  async oAuthLogin({
    service, id, email, name, picture,
  }) {
    const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
    if (user) {
      user.services[service] = id;
      if (!user.name) user.name = name;
      if (!user.picture) user.picture = picture;
      return user.save();
    }
    const password = uuidv4();
    return this.create({
      services: { [service]: id }, email, password, name, picture,
    });
  },

  /**
   * Set google auth creds for specific user
   *
   * @param {String} _id User's id
   * @param {Object} googleAuth google auth object
   * @returns {Object} { n: 1, nModified: 1, ok: 1 }
   */
  setGoogleAuth(_id, googleAuth = {}) {
    const refreshTokenExist = googleAuth.refresh_token ? { 'googleAuth.refresh_token': googleAuth.refresh_token } : {};
    return this.updateOne(
      { _id },
      {
        $set: {
          ...refreshTokenExist,
          'googleAuth.access_token': googleAuth.access_token,
          'googleAuth.token_type': googleAuth.token_type,
          'googleAuth.expiry_date': googleAuth.expiry_date,
        },
      },
    ).exec();
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
