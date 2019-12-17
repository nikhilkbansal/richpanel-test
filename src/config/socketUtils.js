const twitterWebhook = require('./twitterWebhook')
const jwt = require('jwt-simple')
const { jwtSecret } = require('./vars')
module.exports = {
  newConnection: () => {
    global.io.on('connection', (socket) => {

      socket.on('authenticate', async (data) => {
        const userData = jwt.decode(data.token, jwtSecret)
        await twitterWebhook.userUnsubscribe(userData)
        const userActivityWebhook = twitterWebhook.userActivityWebhook(userData)
        userActivityWebhook.then(function (userActivity) {
          userActivity
            .on('tweet_create', (data) => {
              socket.emit('newTweets')
            })
        })
          .catch(error => console.log('error in socket', error))
      })
    })
  },
  emitOverSocketId: (socketId, eventName, data) => {
    global.io.to(`${socketId}`).emit(eventName, data)
  }

}
