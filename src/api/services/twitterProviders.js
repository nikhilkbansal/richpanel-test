const Twit = require('twit')
const { twitterConfig } = require('../../config/vars')

exports.twitter = function twitter (userCreds) {
  console.log('userCreds', userCreds)
  const client = new Twit({
    consumer_key: twitterConfig.consumerKey,
    consumer_secret: twitterConfig.consumerSecret,

    ...userCreds
  })

  return {
    getUserInfo () {
      return client.get('/account/verify_credentials', {})
    },
    getTweets () {
      return client.get('/search/tweets', { q: 'banana' })
    },
    mentionTweets () {
      return client.get('/statuses/mentions_timeline')
    },
    postReplies (params) {
      console.log(params)
      return client.post('/statuses/update', params)
    }
  }
}
