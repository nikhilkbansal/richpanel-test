const axios = require('axios');

const apiUrls = {
  default: {
    test: 'https://test.cashfree.com/',
    production: 'https://api.cashfree.com/',
  },
  payout: {
    test: 'https://payout-gamma.cashfree.com/',
    production: 'https://payout-api.cashfree.com/',
  },
};

const apiKeys = {
  default: {
    test: {
      appId: '8094877b0057ceb51b00a04a4908',
      secretKey: 'c4cee62143fa338fd67469bcfdf768a9867506c0',
    },
    production: {},
  },
  payout: {
    test: {
      appId: 'CF8094D8PZIC0FNQVMQEU',
      secretKey: 'e972c25f26a10143db968b998b62970656398c17',
    },
    production: {},
  },
};


const configAppId = '8094877b0057ceb51b00a04a4908';
const configSecretKey = 'c4cee62143fa338fd67469bcfdf768a9867506c0';

const toUrlEncoded = obj => Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');

class Cashfree {
  constructor(apiKeysObj, env, returnUrl, notifyUrl) {
    this.apiKeys = apiKeysObj;
    this.env = env;
    this.returnUrl = returnUrl;
    this.notifyUrl = notifyUrl;
  }

  updateConfig(newApiKeys, env, returnUrl, notifyUrl) {
    this.apiKeys = newApiKeys;
    this.env = env;
    this.returnUrl = returnUrl;
    this.notifyUrl = notifyUrl;
  }

  async callApi(apiPath, data, headers = {}, credsPlace = 'inBody', apiType = 'default') {
    const inData = {};
    const inHeader = {};
    let convertData = o => o;

    const apiUrl = apiUrls[apiType][this.env];
    const apiKey = this.apiKeys[apiType][this.env];

    if (credsPlace === 'inBody') {
      inData.appId = apiKey.appId;
      inData.secretKey = apiKey.secretKey;
      convertData = toUrlEncoded;
    } else if (credsPlace === 'InHeader') {
      inHeader['Content-Type'] = 'application/json';
      inHeader['X-Client-Id'] = apiKey.appId;
      inHeader['X-Client-Secret'] = apiKey.secretKey;
    }

    try {
      const apiCall = await axios({
        method: 'post',
        url: apiUrl + apiPath,
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
      if (!['SUCCESS', 'OK'].includes(apiCall.data.status)) {
        throw apiCall.data;
      }
      return apiCall.data;
    } catch (e) {
      console.log('Payment Error: ', e);
      if (e && e.message) {
        throw new Error(e.message);
      } else {
        throw new Error('Some error occured! Please try again later');
      }
    }
  }


  /** **************************
   *  Cashfree Payment Gateway
   * *********************** */

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
    return this.callApi('api/v2/cftoken/order', { ...params }, {}, 'InHeader');
  }


  /** **************************
   *  Cashfree Subscriptions
   * *********************** */
  createPlan(params) {
    return this.callApi('api/v2/subscription-plans', { ...params }, {}, 'InHeader');
  }

  createSubscriptions(params) {
    return this.callApi('api/v2/subscriptions', { ...params }, {}, 'InHeader');
  }

  cancelSubscriptions(subReferenceId) {
    return this.callApi(`api/v2/subscriptions/${subReferenceId}/cancel`, {}, {}, 'InHeader');
  }

  /** **************************
   *  Cashfree Payouts
   * *********************** */
  authorizePayout(params) {
    return this.callApi('payout/v1/authorize', { ...params }, {}, 'InHeader', 'payout');
  }

  addBeneficiary(params, headers) {
    return this.callApi('payout/v1/addBeneficiary', { ...params }, headers, 'InHeader', 'payout');
  }
}

async function test() {
  const cashfree = new Cashfree(apiKeys, 'test', 'http://locolhost:3000', 'http://locolhost:3000');

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

module.exports = new Cashfree(apiKeys, 'test', 'http://locolhost:3000', 'http://locolhost:3000');
