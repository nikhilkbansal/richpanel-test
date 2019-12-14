const twitterWebhook = require('./twitterWebhook')
const jwt = require('jwt-simple')
const { jwtSecret } = require('./vars')
module.exports = {
  newConnection: () => {
    global.io.on('connection', (socket) => {
      console.log('id ', socket.id, 'socketid ', socket.conn.id)

      socket.on('authenticate', (data) => {
        console.log('data ', data)
        const userData = jwt.decode(data.token, jwtSecret)
        return
        const userActivityWebhook = twitterWebhook.userActivityWebhook(userData)
        userActivityWebhook.then(function (userActivity) {
          userActivity
            .on('tweet_create', (data) => socket.emit('newTweets'))
        })
      })
    })
  },
  emitOverSocketId: (socketId, eventName, data) => {
    console.log(`Emit ${eventName}`, socketId, data)
    // global.io.emit(eventName, data);
    global.io.to(`${socketId}`).emit(eventName, data)
  }

}
