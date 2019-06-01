const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  register: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(128),
      userName: Joi.string().required(),
      clientType: Joi.string().valid('browser', 'ios', 'android').optional(),
      deviceToken: Joi.string().optional(),
    },
  },

  // POST /v1/auth/login
  login: {
    body: {
      userName: Joi.string().required(),
      password: Joi.string().required().max(128),
      clientType: Joi.string().valid('browser', 'ios', 'android').optional(),
      deviceToken: Joi.string().optional(),
    },
  },

  // POST /v1/auth/facebook
  // POST /v1/auth/google
  oAuth: {
    body: {
      access_token: Joi.string().required(),
      clientType: Joi.string().valid('browser', 'ios', 'android').optional(),
      deviceToken: Joi.string().optional(),
    },
  },

  // POST /v1/auth/refresh
  refresh: {
    body: {
      email: Joi.string().email().required(),
      refreshToken: Joi.string().required(),
    },
  },

  // POST /v1/auth/logout
  logout: {
    body: {
      refreshToken: Joi.string().optional(),
    },
  },

  // POST /v1/auth/googleAuthVerify
  googleAuthVerify: {
    body: {
      code: Joi.string().required(),
    },
  },
};
