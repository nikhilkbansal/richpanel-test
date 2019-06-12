const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('./user.model');
const { handler: errorHandler } = require('../../middlewares/error');
const APIError = require('../../utils/APIError');
const { sendMail } = require('../../services/mailProviders');
const uuidv4 = require('uuid/v4');
const { sendGridForgotPassword } = require('../../../config/vars');


/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { user } = req.locals;
    const newUser = new User(req.body);
    const ommitRole = user.role !== 'admin' ? 'role' : '';
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

    await user.update(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);

    res.json({ ...savedUser.transform(), pictures: [] });
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
    const updatedUser = omit(req.body, ommitRole);

    if (updatedUser.oldPassword
      && !await req.locals.user.passwordMatches(updatedUser.oldPassword)) {
      throw new APIError({ message: 'The password you entered is incorrect' });
    }
    const user = Object.assign(req.locals.user, updatedUser);

    user.save()
      .then(savedUser => res.json({ ...savedUser.transform(), pictures: [] }))
      .catch(e => next(User.checkDuplicateEmail(e)));
  } catch (error) {
    next(error);
  }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};

/**
 * find user with particular email &
 * send email for with reset password link
 */
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.getUser({ email });

    const forgotPasswordKey = uuidv4();
    const dynamic_template_data = {
      reset: `${'our domain address' + 'Reset?id='}${forgotPasswordKey}`,
    };
    await sendMail({ email, dynamic_template_data, sendGridForgotPassword });
    user.forgotPasswordKey = forgotPasswordKey;
    await user.save();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { password, forgotPasswordKey } = req.body;
    const user = await User.getUser({ forgotPasswordKey });
    user.password = password;
    await user.save();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

exports.add = async (req, res, next) => {
  try {
    const { preferences } = req.body;
    const { user } = req.locals;
    user.preferences = preferences;// if the user adds new preference it
    // will remove the old prefrences
    await user.save();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
