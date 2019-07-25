
const payumoney = require('payumoney-node');
const request = require('request');
const {
  payUConfig: {
    urls, mode, credentials, isProduction,
  },
} = require('./../../config/vars');

payumoney.isProdMode(!isProduction);
payumoney.setKeys(credentials.key, credentials.salt, credentials.authHeader);

exports.makePayment = (data) => {
  const paymentData = {
    // txnid: `PAYU${Math.floor(Math.random() * 1000)}-${Date.now()}`,
    ...data,
    // productinfo: 'ada',
    // txnid: '2323234234',
    // amount: '22',
    // email: 'rahul@yopmail.com',
    // phone: '2323232323',
    // lastname: 'rahu;',
    // firstname: 'saini',

    ...urls,
  };
  return new Promise((resolve, reject) => {
    payumoney.makePayment(paymentData, (error, response) => {
      console.log('(error, response)', data, error, response);
      if (error) {
        reject(error);
        // Some error
      } else {
        // Payment redirection link
        resolve(response);
      }
    });
  });
};


exports.paymentResponse = async (data, callback) => {
  console.log('data', data);
  console.log('url', `https://secure.payu.in/${API.paymentResponse}`);
  const params = {
    merchantKey: credentials.key,
    merchantTransactionIds: data.txnid,
  };
  request.post({ headers, url: `https://www.payumoney.com/${API.paymentResponse}`, form: params }, (error, response, body) => {
    if (error) {
      console.log('error', error);
    } else {
      console.log('response***********', JSON.parse(response.body));
    }
  });
};

exports.refundPayment = async (data, callback) => {
  const params = {
    merchantKey: credentials.key,
    paymentId: data.paymentId,
    refundAmount: data.amount,
  };
  request.post(`https://www.payumoney.com/treasury/${API.refundPayment}`, { form: params, headers }, (error, response, body) => {
    if (error) {
      console.log('error', error);
    } else {
      console.log('response***********', JSON.parse(response.body));
    }
  });
};

exports.refundStatus = async (paymentId, callback) => {
  request.get(`${rest_url[mode] + API.refundStatus}merchantKey=${credentials.key}&paymentId=${paymentId}`, { headers }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const result = JSON.parse(body);
      callback(error, result);
    }
  });
};
