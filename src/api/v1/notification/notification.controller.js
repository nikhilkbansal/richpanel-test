const httpStatus = require('http-status');
const Notification = require('./notification.model');
const RefreshToken = require('../auth/refreshToken.model');
const User = require('../user/user.model');
const fcm = require('../../services/fcmProviders');


/**
Examples:

You have received new attatchment from Goonj

Rahul is commented on your post/event/campaign

Rahul is replied to your comment

Rahul is started following you

Rahul donated R100 in your campaign.

Rahul has started recurring donation of R1000
 */
function getNotificationTitle(type, notificationObj) {
  switch (type) {
    case 'newDonationAttatchment':
      return `You have received new attatchment from ${notificationObj.senderName}`;
    case 'newRecurringDonation':
      return `${notificationObj.senderName} has started recurring donation of ₹${notificationObj.donationAmount}`;
    case 'newDonation':
      return `${notificationObj.senderName} has donated ₹${notificationObj.donationAmount}`;
    case 'newComment':
      return `${notificationObj.senderName} is commented on your post`;
    case 'newCommentReply':
      return `${notificationObj.senderName} is replied on your comment`;
    case 'newFollower':
      return `${notificationObj.senderName} is started following you`;
    default:
      return '';
  }
}

/**
 * Send notification
 *
 * @param {*} notification i.e. { type: String, receiverId: String, senderId: String, meta: Object,
 *                                donationAmount: Number, pushNotificationData: Object  }
 */
async function sendNotification(notification, doSave = true, sendPush = true) {
  const sender = await User.findOne({ _id: notification.senderId });
  const notificationTitle = getNotificationTitle(
    notification.type,
    { senderName: sender.name, donationAmount: notification.donationAmount },
  );

  if (doSave) {
    notification.notification = notificationTitle;
    const savedNotification = new Notification(notification);
    await savedNotification.save();
  }

  if (sendPush) {
    let tokens = {};
    if (notification.receiverId) {
      tokens = await RefreshToken.findOne({ userId: notification.receiverId, isLogout: false });
    }

    if (tokens && tokens.clientMeta && tokens.clientMeta.deviceToken) {
      const to = tokens.clientMeta.deviceToken;
      fcm.sendFcmMessage({
        to,
        notification: {
          title: notificationTitle,
          body: '',
        },
        data: notification.pushNotificationData,
      });
    }
  }
  return true;
}

exports.sendNotification = sendNotification;

/**
 * Add post to database.
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const { user } = req;
    const notifications = await Notification.list({ receiverId: user._id });
    res.status(httpStatus.CREATED);
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};


exports.remove = async (req, res, next) => {
  const { user } = req;

  Notification.removeReaction({ ...req.body, userId: user._id })
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(error => next(error));
};
