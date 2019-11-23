/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

// const httpStatus = require('http-status');
// const { omitBy, isNil } = require('lodash');
// const bcrypt = require('bcryptjs');
// const moment = require('moment-timezone');
// const jwt = require('jwt-simple');
// const uuidv4 = require('uuid/v4');
// const APIError = require('../../utils/APIError');
// const { env, jwtSecret, jwtExpirationInterval } = require('../../../config/vars');

/**
* User Roles
*/

/**
 * Event Schema
 * @private
 */


const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  isRepost: {
    type: Boolean,
    default: false,
  },
  repostOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  files: {
    type: Array,
    default: [],
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  location: {
    longLat: Array,
    landmarkFlatNo: String,
    city: String,
    country: String,
  },

}, {
  timestamps: true,
});

eventSchema.index({ title: 'text', description: 'text' });

eventSchema.statics = {
  async list({
    skip = 0, perPage = 30, _id, userId, title, $text, endTime,
  }) {
    const options = omitBy({
      _id, userId, title, $text, endTime,
    }, isNil);

    let separateTextCondi = [];
    if (options.$text) {
      separateTextCondi = [{
        $match: { $text: options.$text },
      }];
      delete options.$text;
    }

    if (options._id && typeof options._id === 'string') {
      options._id = mongoose.Types.ObjectId(options._id);
    }

    if (options.userId && typeof options.userId === 'string') {
      options.userId = mongoose.Types.ObjectId(options.userId);
    }

    const optionsForRepost = { ...options };
    delete optionsForRepost.endTime;

    const repostOfCondition = {};
    if (options.endTime) {
      repostOfCondition['repostOf.endTime'] = options.endTime;
    }

    const posts = await this.aggregate([
      ...separateTextCondi,
      {
        $match: {
          $or: [
            { ...options, isRepost: false },
            { isRepost: true, ...optionsForRepost },
          ],
        },
      },
      {
        $lookup: {
          from: 'users', localField: 'userId', foreignField: '_id', as: 'userId',
        },
      },
      {
        $lookup: {
          from: 'events', localField: 'repostOf', foreignField: '_id', as: 'repostOf',
        },
      },
      { $unwind: '$userId' },
      { $unwind: '$repostOf' },
      {
        $lookup: {
          from: 'users', localField: 'repostOf.userId', foreignField: '_id', as: 'repostOf.userId',
        },
      },
      { $unwind: '$repostOf.userId' },
      {
        $match: {
          $or: [
            { isRepost: false },
            { isRepost: true, ...repostOfCondition },
          ],
        },
      },
      { $skip: Number(skip) },
      { $limit: perPage },
    ]).exec();

    // const posts = await this.find(options).sort({ createdAt: -1 })
    //   .skip(parseInt(skip, 10))
    //   .limit(perPage)
    //   .populate('userId', 'name _id picture')
    //   .populate({
    //     path: 'repostOf',
    //     populate: {
    //       path: 'userId',
    //       select: 'name _id picture',
    //     },
    //   })
    //   .exec();

    return posts.map((event) => {
      if (event.isRepost && event.repostOf) {
        event.title = event.repostOf.title;
        event.raisedMoney = event.repostOf.raisedMoney;
        event.startTime = event.repostOf.startTime;
        event.endTime = event.repostOf.endTime;
        event.files = event.repostOf.files;
      }
      return event;
    });
  },

};


module.exports = mongoose.model('Event', eventSchema);
