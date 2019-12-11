const httpStatus = require('http-status');
const passport = require('passport');
const APIError = require('../utils/APIError');
const jwt = require('jwt-simple');
const { jwtSecret } = require('../../config/vars');

exports.authorize = function authorize(req, res, next) {
  const apiError = new APIError({
    message: 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
  });

  if (!req || !req.headers || !req.headers['x-auth-token']) {
    return next(apiError);
  }

  const data = jwt.decode(req.headers['x-auth-token'], jwtSecret);

  if (!data) {
    return next(apiError);
  }

  req.user = data;
  return next();
};

exports.oAuth = service =>
  passport.authenticate(service, { session: false });

