const FCM = require('fcm-node');
const { fcmServerKey } = require('../../config/vars');

const fcm = new FCM(fcmServerKey);


exports.sendFcm = function sendFcm() {
  const message = {
    to: 'registration_token',
    collapse_key: 'your_collapse_key',

    notification: {
      title: 'Title of your push notification',
      body: 'Body of your push notification',
    },

    data: { // you can send only notification or only data(or include both)
      my_key: 'my value',
      my_another_key: 'my another value',
    },
  };

  fcm.send(message, (err, response) => {
    if (err) {
      console.log('Something has gone wrong!');
    } else {
      console.log('Successfully sent with response: ', response);
    }
  });
};

