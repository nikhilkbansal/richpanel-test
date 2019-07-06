const request = require('request');
const sha512 = require('js-sha512');
const { payUConfig: { mode, credentials } } = require('./../../config/vars');

const payment_url = {
  prod: 'https://secure.payu.in/',
  // test: 'https://sandboxsecure.payu.in/',
  test: 'https://test.payu.in/',
};

const rest_url = {
  prod: 'https://www.payumoney.com/',
  test: 'https://test.payu.in/',
};

const API = {
  makePayment: '_payment',
  paymentResponse: 'payment/op/getPaymentResponse?',
  refundPayment: 'merchant/refundPayment?',
  refundStatus: 'treasury/ext/merchant/getRefundDetailsByPayment?',
};

const headers = {
  authorization: 'bNdF3AvBiWsYTROpAAHXVQ7W48CkR5pKdQQhKYuRm40=', // will be provided by payumoney
  'Content-Type': 'application/json',
};


exports.makePayment = async (data, callback) => {
  const hashData = {
    preHashString: `${credentials.key}|${data.txnid}|
  ${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${credentials.salt}`,
  };
  console.log('hashData.preHashString', hashData.preHashString);

  const hash = sha512(hashData.preHashString);
  const payuData = {
    key: credentials.key,
    salt: credentials.salt,
    service_provider: credentials.service_provider,
    furl: 'http://localhost:3000/success',
    surl: 'http://localhost:3000/failure',
    hash,

  };
  const params = Object.assign(payuData, data);
  console.log('params***********', payuData);
  // const payment = await request.post(payment_url[mode] + API.makePayment, { form: params, headers })
  request.post({
    url: `https://test.payu.in/${API.makePayment}`,
    form: params,
    headers,
  }, (error, response, body) => {
    if (!error) {
      const result = response.headers.location;
      callback(error, result);
      console.log('result', result, body);
    } else {
      console.log('response', response.headers.location);
    }
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
