const httpStatus = require('http-status');
const passport = require('passport');
const User = require('../v1/user/user.model');
const APIError = require('../utils/APIError');

const ADMIN = 'admin';
const LOGGED_USER = '_loggedUser';

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = Promise.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  });

  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  if (roles === LOGGED_USER) {
    if (user.role !== 'admin' && req.params.userId !== user._id.toString()) {
      apiError.status = httpStatus.FORBIDDEN;
      apiError.message = 'Forbidden';
      return next(apiError);
    }
  } else if (!roles.includes(user.role)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = 'Forbidden';
    return next(apiError);
  } else if (err || !user) {
    return next(apiError);
  }

  req.user = user;

  return next();
};

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

exports.authorize = (roles = User.roles) => (req, res, next) =>
  passport.authenticate(
    'jwt', { session: false },
    handleJWT(req, res, next, roles),
  )(req, res, next);

exports.oAuth = service =>
  passport.authenticate(service, { session: false });

exports.authorizePost = async (req, res, next) => {
  const apiError = new APIError({
    status: httpStatus.NOT_FOUND,
    message: 'Not found',
  });
  if (!req.locals.post) {
    return next(apiError);
  }

  if (!req.user || (req.locals.post.userId.toString()
    !== req.user._id.toString() && req.user.role !== ADMIN)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = 'Forbidden';
    return next(apiError);
  }
  return next();
};

exports.authorizeEvent = async (req, res, next) => {
  const apiError = new APIError({
    status: httpStatus.NOT_FOUND,
    message: 'Not found',
  });
  if (!req.locals.event) {
    return next(apiError);
  }

  if (!req.user || (req.locals.event.userId.toString()
    !== req.user._id.toString() && req.user.role !== ADMIN)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = 'Forbidden';
    return next(apiError);
  }
  return next();
};
