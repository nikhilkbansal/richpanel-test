// import .env variables

require('dotenv').config();


/** Default config will remain same in all environments and can be overrided */
const defaultConfig = {
  admin: 'admin',
  loggedUser: '_loggedUser',
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  jwtSecret: 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4',
  jwtExpirationInterval: 30,
  twitterConfig: {
    consumerKey: 'u5h3Mu4EVEOeatsJCdkAWb2ip',
    consumerSecret: 'tnRS7uqqV94EiyJOisxG9lnMYXOL5DzdysuhSsY7p69I6HVKGE',
    accessToken: '976104661680717825-Qvgf1QGub1CIiMQKMklzpZkRbdpu7V3',
    accessTokenSecret: '9HAz9M27P5CXR2h3cYKV21L65R9ifd138sokIl28R7IaO'
  },
  whitelist: ['http://example1.com', 'http://example2.com'],
  socketPort: 5001,
  socketUrl: '127.0.0.1'
};

/** Development config variable */
const devConfig = {
  whitelist: null,
  logs: 'dev',
};

/** Test config variable */
const testConfig = {
  whitelist: null
};

/** Production config variable */
const productionConfig = {
  logs: 'combined',
};

/** Choosing config base on node env */
let config = devConfig;
if (process.env.NODE_ENV === 'production') {
  config = productionConfig;
} else if (process.env.NODE_ENV === 'test') {
  config = testConfig;
}

module.exports = {
  ...defaultConfig,
  ...config,
};
