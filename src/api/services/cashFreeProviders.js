const axios = require('axios');

const testUrl = 'https://test.cashfree.com/';
const productionUrl = 'https://api.cashfree.com/';
const configAppId = '8094877b0057ceb51b00a04a4908';
const configSecretKey = 'c4cee62143fa338fd67469bcfdf768a9867506c0';

const toUrlEncoded = obj => Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');

class Cashfree {
  constructor(appId, secretKey, testEnv, returnUrl, notifyUrl) {
    this.appId = appId;
    this.secretKey = secretKey;
    this.url = testEnv === 'test' ? testUrl : productionUrl;
    this.returnUrl = returnUrl;
    this.notifyUrl = notifyUrl;
  }

  updateConfig(appId, secretKey, testEnv, returnUrl, notifyUrl) {
    this.appId = appId;
    this.secretKey = secretKey;
    this.url = testEnv === 'test' ? testUrl : productionUrl;
    this.returnUrl = returnUrl;
    this.notifyUrl = notifyUrl;
  }

  async callApi(apiPath, data, headers = {}, credsPlace = 'inBody') {
    const inData = {};
    const inHeader = {};
    let convertData = o => o;

    if (credsPlace === 'inBody') {
      inData.appId = this.appId;
      inData.secretKey = this.secretKey;
      convertData = toUrlEncoded;
    } else if (credsPlace === 'InHeader') {
      inHeader['Content-Type'] = 'application/json';
      inHeader['X-Client-Id'] = this.appId;
      inHeader['X-Client-Secret'] = this.secretKey;
    }

    try {
      const apiCall = await axios({
        method: 'post',
        url: this.url + apiPath,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          ...inHeader,
          ...headers,
        },
        data: convertData({
          ...inData,
          ...data,
        }),
      });
      if (apiCall.data.status !== 'OK') {
        throw apiCall.data;
      }
      return apiCall.data;
    } catch (e) {
      console.log('Payment Error: ', e);
      throw new Error('Some error occured! Please try again later');
    }
  }

  // Payment Gateway
  orderCreate(params) {
    return this.callApi('api/v1/order/create', { ...params, returnUrl: this.returnUrl, notifyUrl: this.notifyUrl });
  }

  getOrderStatus(params) {
    return this.callApi('api/v1/order/info/status', { ...params });
  }

  getOrderDetails(params) {
    return this.callApi('api/v1/order/info', { ...params });
  }

  // Used with seamless payment
  createCfToken(params) {
    return this.callApi('/api/v2/cftoken/order', { ...params }, {}, 'InHeader');
  }

  // Subscriptions
  createPlan(params) {
    return this.callApi('/api/v2/subscription-plans', { ...params }, {}, 'InHeader');
  }

  createSubscriptions(params) {
    return this.callApi('/api/v2/subscriptions', { ...params }, {}, 'InHeader');
  }
}

async function test() {
  const cashfree = new Cashfree(configAppId, configSecretKey, 'test', 'http://locolhost:3000', 'http://locolhost:3000');

  // const data = await cashfree.orderCreate({
  //   orderId: 'xBasilxTjjjestx1',
  //   orderAmount: 154,
  //   orderNote: 'Subscription',
  //   customerName: 'Test%20Name',
  //   customerPhone: 919034343434,
  //   customerEmail: 'basi@cashfree.com',
  // });
  // console.log('ordrCreate', data);

  // const data = await cashfree.orderGetDetails({
  //   orderId: 'xBasilxTjjjestx1',
  // });


  const data = await cashfree.orderGetDetails({
    orderId: 'xBasilxTjjjestx1',
  });
  console.log('data', data);
}

// test();

module.exports = new Cashfree(configAppId, configSecretKey, 'test', 'http://locolhost:3000', 'http://locolhost:3000');
