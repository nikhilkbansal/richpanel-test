const Joi = require('joi');
const User = require('./user.model');

module.exports = {

  // GET /v1/users
  listUsers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      email: Joi.string(),
      role: Joi.string().valid(User.roles).default('user'),
    },
  },

  // POST /v1/users
  createUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128),
      role: Joi.string().valid(User.roles),
      files: Joi.array(),
    },
  },

  // PUT /v1/users/:userId
  replaceUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128),
      role: Joi.string().valid(User.roles),
    },
    params: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v1/users/:userId
  updateUser: {
    body: {
      // email: Joi.string().email(),
      password: Joi.string().min(6).max(128),
      oldPassword: Joi.string().min(6).max(128),
      name: Joi.string().max(128),
      files: Joi.array(),
      poInfo: Joi.object(),
      // role: Joi.string().valid(User.roles),
    },
    params: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
  // POST /v1/users/forgotPassword

  forgotPassword: {
    body: {
      email: Joi.string().email().required(),
    },
  },

  resetPassword: {
    body: {
      password: Joi.string().min(6).max(128),
      forgotPasswordKey: Joi.string().required(),

    },
  },
  preferences: {
    body: {
      preferences: Joi.array().items(Joi.string()).required(),
    },
  },
};
