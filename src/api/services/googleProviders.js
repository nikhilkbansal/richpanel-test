const { google } = require('googleapis');
const { googleConfig } = require('../../config/vars');
const User = require('../v1/user/user.model');

global.currentAuthUserId = 0;
const oauth2Client = new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.authorizedRedirectUrl,
);

google.options({
  auth: 'AIzaSyCmEXhJDt2rGqLt2yLccbvjs9L5rgyX_QM',
});

/**
 * Store updated access token in db
 *
 * @listens whenever token changes
 * @param {Object} Access token object
 * @returns {void}
 */
oauth2Client.on('tokens', (tokens) => {
  if (global.currentAuthUserId) {
    // store the refresh_token in my database!
    console.log('tokens.refresh_token', tokens);
    User.setGoogleAuth(global.currentAuthUserId, tokens);
  }

  console.log('tokens.access_token', tokens);
});


/**
 * Set oauth2Client's credentials to given credentials
 *
 * @param {_id} User's _id
 * @param {googleAuth} googleAuth object
 * @returns {void}
 */
async function setCredentials({ _id, googleAuth }) {
  global.currentAuthUserId = _id;
  oauth2Client.setCredentials(googleAuth);
  google.options({
    auth: oauth2Client,
  });
}

/**
* Returns a URL, where user can navigate and allow us to access his information
* @private
*/
exports.googleAuthInit = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  // Will force the approval page to be displayed even
  // if the user has previously authorized your application
  // Good in case we lost the refresh_token
  prompt: 'consent',
  // If you only need one scope you can pass it as a string
  scope: googleConfig.scopes,
});

/**
* Returns a {Object}, where user can navigate and allow us to access his information
*
* @param {string} code Google returned code after giving permission
* @return {Promise} Promise<GetTokenResponse> gives access token
* @private
*/
exports.googleAuthGetToken = code => oauth2Client.getToken(code);


/**
* Youtube APIs
*/


/**
* Get channels
*
* @param {Object} user object where _id and googleAuth is required,
* if not given then google will use api_keys as authentication
* @param {object} options Request parameters for youtube api
* @returns {Object} list of channels
*/
exports.channelslist = async (user = null, options = { mine: true }) => {
  if (user) { await setCredentials(user); }
  console.log('add competitor options', options);
  const { data: { items } } = await google.youtube('v3').channels.list({
    part: 'snippet,contentDetails,statistics',
    ...options,
  });
  return items;
};


/**
* Get videoslist by channels
*
* @param {Object} user object where _id and googleAuth is required
* @param {String} channelId Id of a channel
* @returns {Object} list of channels
*/
exports.videoListPerChannel = async (user, channelId) => {
  await setCredentials(user);
  // find method to get the username
  const { data: { items } } = await google.youtube('v3').search.list({
    part: 'snippet',
    channelId,
    type: 'video',
  });
  return items;
};


/**
* Get subscriber by channel id
*
* @param {Object} user object where _id and googleAuth is required
* @param {String} channelId Id of a channel
* @returns {Object} list of channels
*/
exports.subscriberListPerChannel = async (user, channelId) => {
  await setCredentials(user);
  // find method to get the username
  const { data } = await google.youtube('v3').subscriptions.list({
    part: 'snippet,contentDetails',
    forChannelId: channelId,
    mySubscribers: true,
  });
  return data;
};

