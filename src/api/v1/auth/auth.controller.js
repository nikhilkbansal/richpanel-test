const httpStatus = require('http-status');
const User = require('../user/user.model');
const RefreshToken = require('./refreshToken.model');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../../config/vars');
const { googleAuthInit, googleAuthGetToken } = require('../../services/googleProviders');
const { google } = require('../../services/authProviders');
const APIError = require('../../utils/APIError');

/**
 * @async
 * Returns a formated object with tokens
 * @param {object} user object
 * @param {string} accessToken token
 * @param {string} refreshObjectId _id of refreshToken if planning to update previous one
 * @returns {object} access token object
 * @private
 */
async function generateTokenResponse(user, accessToken, refreshObjectId = null) {
  const tokenType = 'Bearer';
  const refreshToken = await RefreshToken.generate(user, refreshObjectId);
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType, accessToken, refreshToken: refreshToken.token, expiresIn,
  };
}


/**
 * @async
 * Register user
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 * @param {function} next to go next matching route or middleware
 * @returns {(Object|next)} Return token object and user details
 * @throws {number} free-form description
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const {
      email, userName, clientType, deviceToken,
    } = req.body;
    delete req.body.deviceToken;
    delete req.body.clientType;
    const isEmailExisted = await User.findOne({ email });
    if (isEmailExisted) {
      throw new APIError({ message: 'The email you entered is already registered' });
    }
    const isUserNameExisted = await User.findOne({ userName });
    if (isUserNameExisted) {
      throw new APIError({ message: 'The username you entered is already registered' });
    }
    let isActiveCondition = {};
    if (req.body.role === 'ngo') {
      // commenting it for now
      // isActiveCondition = { isActive: false };
      isActiveCondition = { isActive: true };
    }
    const user = await (new User({ ...req.body, ...isActiveCondition })).save();
    const userTransformed = user.transform();
    const token = await generateTokenResponse({ ...user, clientType, clientMeta: { deviceToken } }, user.token());
    res.status(httpStatus.CREATED);
    return res.json({ token, profile: { ...userTransformed, pictures: [] } });
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};


/**
 * Returns jwt token if valid username and password is provided
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 * @param {function} next to go next matching route or middleware
 * @returns {(void|object)} res or next if error comes
 */
exports.login = async (req, res, next) => {
  try {
    const { clientType, deviceToken } = req.body;
    delete req.body.deviceToken;
    delete req.body.clientType;
    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    const tokenObject = await generateTokenResponse(
      { ...user.toObject(), clientType, clientMeta: { deviceToken } },
      accessToken,
    );
    console.log('tokenObject', tokenObject);
    const userTransformed = user.transform();
    return res.json({ token: tokenObject, profile: { ...userTransformed, pictures: [] } });
  } catch (error) {
    return next(error);
  }
};


/**
 * Step 1 of google authentication where url will be generated
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 * @param {function} next to go next matching route or middleware
 * @returns {(Object|next)} Returns google auth url
 * @public
 */
exports.googleAuthInit = async (req, res, next) => {
  try {
    return res.json({ url: googleAuthInit });
  } catch (error) {
    return next(error);
  }
};


/**
 * Step 2 of google authentication where jwt token will be returned if valid auth code.
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 * @param {function} next to go next matching route or middleware
 * @returns {(Object|next)} google url for client side to redirect user on it for further steps
 * @public
 */
exports.googleAuthVerify = async (req, res, next) => {
  try {
    const { code } = req.body;
    try {
      const googleResponse = await googleAuthGetToken(code);
      const googleUserInfo = await google(googleResponse.tokens.access_token);
      const user = await User.oAuthLogin(googleUserInfo);
      user.googleAuth = googleResponse.tokens;
      user.save();

      const accessToken = user.token();
      const token = await generateTokenResponse(user, accessToken);
      const userTransformed = user.transform();
      return res.json({ token, profile: { ...userTransformed, pictures: [] } });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    console.log('error', error);
    return next(error);
  }
};


/**
 * Login with an existing user or creates a new one if valid accessToken token
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 * @param {function} next to go next matching route or middleware
 * @returns {(Object|next)} google url for client side to redirect user on it for further steps
 * @public
 */
exports.oAuth = async (req, res, next) => {
  try {
    const { user } = req;
    const accessToken = user.token();
    const token = await generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, profile: { ...userTransformed, pictures: [] } });
  } catch (error) {
    return next(error);
  }
};


/**
 * Returns a new jwt when given a valid refresh token
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 * @param {function} next to go next matching route or middleware
 * @returns {(Object|next)} google url for client side to redirect user on it for further steps
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOne({
      userEmail: email,
      token: refreshToken,
    });
    const { user, accessToken } = await User.findAndGenerateToken({ email, refreshObject });
    const response = await generateTokenResponse(user, accessToken, refreshObject._id);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};


/**
 * Logout user, if refreshToken is given will logout from single device else from all devices
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 * @param {function} next to go next matching route or middleware
 * @returns {(Object|next)} google url for client side to redirect user on it for further steps
 * @public
 */
exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { user } = req;
    const { email } = user;
    // If refreshToken is given then logout from only one device else from all
    const refreshTokenCondition = refreshToken ? { token: refreshToken } : {};
    await RefreshToken.updateMany({
      ...refreshTokenCondition,
      userEmail: email,
    }, {
      isLogout: true,
      logoutDate: moment(),
    });
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

