const AWS = require('aws-sdk');
const { awsConfig } = require('../../config/vars');


AWS.config = new AWS.Config();
AWS.config.accessKeyId = awsConfig.accessKey;
AWS.config.secretAccessKey = awsConfig.secretKey;
AWS.config.region = 'us-east-1';

/**
 * Send sms
 *
 * @example params = {
 *  Message: 'sample message',
 *  MessageStructure: 'string',
 *   PhoneNumber: '+919555723970',
 * }
 */
exports.sendSms = async function sendSms(params) {
  const sns = new AWS.SNS();
  return sns.publish(params).promise();
};

