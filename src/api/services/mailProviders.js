const axios = require('axios');
const { sendGridToken, sendGridFromMail } = require('../../config/vars');

/**
 * Send mail with sendgrid
 *
 * @returns {Promise<Success, Error>}
 * @public
 */
// eslint-disable-next-line camelcase
module.exports.sendMail = ({ email, dynamic_template_data = {}, template_id }) =>
  axios({
    method: 'post',
    url: 'https://api.sendgrid.com/v3/mail/send',
    headers: {
      'content-type': 'application/json',
      Authorization:
        `Bearer ${sendGridToken}`,
    },
    data: {
      from: {
        email: sendGridFromMail,
      },
      personalizations: [
        {
          to: [
            {
              email,
            },
          ],
          dynamic_template_data,
        },
      ],
      template_id,
    },
  });
