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
 * Post Schema
 * @private
 */
const postSchema = new mongoose.Schema({
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
    required: true,
  },
  raisedMoney: {
    type: Number,
    default: 0,
  },
  isRepost: {
    type: Boolean,
    default: false,
  },
  repostOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  campaignGoal: String,
  campaignStartDate: Date,
  campaignEndDate: Date,
  files: {
    type: Array,
    default: [],
  },
  location: {
    longLat: Array,
    landmarkFlatNo: String,
    city: String,
    country: String,
  },
  type: {
    type: String,
    enum: ['post', 'campaign'],
    default: 'post',
  },
  status: {
    type: String,
    enum: ['active', 'delete', 'originalPostDelete'], // originalPostDelete = Original post is deleted from which it became repost
    default: 'active',
  },
}, {
  timestamps: true,
});

postSchema.index({ title: 'text', description: 'text' });

postSchema.statics = {
  async updateRaisedMoney(_id, raisedMoney) {
    return this.updateOne({ _id }, { $inc: { raisedMoney } });
  },
  async list({
    skip = 0, perPage = 30, _id, userId, title, $text, $or,
  }) {
    const options = omitBy({
      _id, userId, title, $text, $or,
    }, isNil);
    const posts = await this.aggregate([
      { $match: options },
      {
        $lookup: {
          from: 'users', localField: 'userId', foreignField: '_id', as: 'userId',
        },
      },
      {
        $lookup: {
          from: 'posts', localField: 'repostOf', foreignField: '_id', as: 'repostOf',
        },
      },
      { $unwind: '$userId' },
      { $unwind: '$repostOf' },
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
    console.log('posts', posts);
    return posts.map((post) => {
      if (post.isRepost && post.repostOf) {
        post.title = post.repostOf.title;
        post.raisedMoney = post.repostOf.raisedMoney;
        post.campaignGoal = post.repostOf.campaignGoal;
        post.campaignStartDate = post.repostOf.campaignStartDate;
        post.campaignEndDate = post.repostOf.campaignEndDate;
        post.files = post.repostOf.files;
        post.type = post.repostOf.type;
      }
      return post;
    });
  },

};

module.exports = mongoose.model('Post', postSchema);
