const FCM = require('fcm-node');
const { fcmServerKey } = require('../../config/vars');
const RefreshToken = require('../v1/auth/refreshToken.model');

const fcm = new FCM(fcmServerKey);

/**
 * Send push notification
 *
 * @example const message = {
 *   to: 'registration_token',
 *   collapse_key: 'your_collapse_key',

 *   notification: {
 *     title: 'Title of your push notification',
 *     body: 'Body of your push notification',
 *   },

 *   data: // you can send only notification or only data(or include both)
 *     my_key: 'my value',
 *     my_another_key: 'my another value',
 *   },
 * }
 */
exports.sendFcmMessage = async function sendFcmMessage(message) {
  return Promise.promisify(fcm.send)({ message });
};

