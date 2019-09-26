const Joi = require('joi');
// const Post = require('./post.model');
const Share = require('./share.model');

module.exports = {

  add: {
    body: {
      itemType: Joi.string().required().valid(Share.shareType),
      itemId: Joi.string().required(),
    },
  },


};
