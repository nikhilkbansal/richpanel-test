const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

/** Default config will remain same in all environments and can be overrided */
const defaultConfig = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  whitelist: ['http://example1.com', 'http://example2.com'],
  mongo: { uri: process.env.MONGO_URI },
  logs: 'dev',
  ddosConfig: {
    burst: 10, limit: 15,
  },
};

/** Development config variable */
const devConfig = {
  whitelist: null,
};

/** Test config variable */
const testConfig = {
  whitelist: null,
  mongo: { uri: process.env.MONGO_URI_TESTS },
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
