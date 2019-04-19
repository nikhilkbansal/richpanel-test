// import .env variables

require('dotenv').config();


/** Default config will remain same in all environments and can be overrided */
const defaultConfig = {
  admin: 'admin',
  loggedUser: '_loggedUser',
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  sendGridFromMail: 'help@vidspy.com',
  sendGridToken: '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',
  jwtSecret: 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4',
  jwtExpirationInterval: 1440,
  whitelist: ['http://example1.com', 'http://example2.com'],
  mongo: { uri: 'mongodb://localhost:27017/video-spy' },
  logs: 'dev',
  ddosConfig: {
    burst: 100, limit: 100,
  },
  signaleConfig: {
    displayFilename: true,
    displayTimestamp: true,
    displayDate: false,
  },
  googleConfig: {
    clientId: '531599947773-1gt0h3g89jqpdlat8eaeg6en59bovhgk.apps.googleusercontent.com',
    clientSecret: 'Ty28iGN4dTqublw-jvKIlkx8',
    authorizedRedirectUrl: 'http://localhost:3000',
    scopes: [
      'email',
      'profile',
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtubepartner',
      'https://www.googleapis.com/auth/youtubepartner-channel-audit',
      'https://www.googleapis.com/auth/yt-analytics-monetary.readonly',
      'https://www.googleapis.com/auth/yt-analytics.readonly',
      'https://mail.google.com/',
    ],
  },
};

/** Development config variable */
const devConfig = {
  whitelist: null,
};

/** Test config variable */
const testConfig = {
  whitelist: null,
  mongo: { uri: 'mongodb://localhost:27017/video-spy' },
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
