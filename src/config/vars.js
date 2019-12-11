// import .env variables

require('dotenv').config();


/** Default config will remain same in all environments and can be overrided */
const defaultConfig = {
  admin: 'admin',
  loggedUser: '_loggedUser',
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3002,
  jwtSecret: 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4',
  jwtExpirationInterval: 30,
  twitterConfig: {
    consumerKey: 'u5h3Mu4EVEOeatsJCdkAWb2ip',
    consumerSecret: 'tnRS7uqqV94EiyJOisxG9lnMYXOL5DzdysuhSsY7p69I6HVKGE',
  },
  whitelist: ['http://example1.com', 'http://example2.com'],
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
