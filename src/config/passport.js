const { twitterConfig } = require('./vars');
const TwitterTokenStrategy = require('passport-twitter-token');


exports.twitter = new TwitterTokenStrategy(
  {
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret,
    includeEmail: true,
  },
  (token, tokenSecret, profile, done) => done(null, profile)
);

