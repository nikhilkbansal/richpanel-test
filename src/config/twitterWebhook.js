const twitterWebhooks = require('twitter-webhooks')
const { twitterConfig } = require('./vars')

let userActivityWebhook = {}

exports.setUserActivityWebhook = function (app) {
  userActivityWebhook = twitterWebhooks.userActivity({
    serverUrl: 'https://salty-plains-79519.herokuapp.com',
    route: '/', // default : '/'
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret,
    accessToken: twitterConfig.accessToken,
    accessTokenSecret: twitterConfig.accessTokenSecret,
    environment: 'dev',
    app
  })
  userActivityWebhook.register()
}

exports.userActivityWebhook = function ({
  user_id,
  oauth_token, oauth_token_secret
}) {
  // Subscribe for a particular user activity
  return userActivityWebhook.subscribe({
    userId: user_id,
    accessToken: oauth_token,
    accessTokenSecret: oauth_token_secret
  })
}
exports.userWebhookSubscribed = function ({
  user_id,
  oauth_token, oauth_token_secret
}) {
  // Subscribe for a particular user activity
  return userActivityWebhook.isSubscribed({
    userId: user_id,
    accessToken: oauth_token,
    accessTokenSecret: oauth_token_secret
  })
}


// // listen to any user activity
// userActivityWebhook.on('event', (event, userId, data) => console.log(userId + ' - favorite'))

// // listen to unknown payload (in case of api new features)
// userActivityWebhook.on('unknown-event', (rawData) => console.log(rawData))
