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
        console.log('userData', userData)
        const userActivityWebhook = twitterWebhook.userActivityWebhook(userData)
        userActivityWebhook.then(function (userActivity) {
          console.log('useractivity', userActivity)
          userActivity
            .on('tweet_create', (data) => {
              socket.emit('newTweets')
              console.log('data inside socket', data)
            })
        })
          .catch(error => console.log('error in socket', error))
      })
    })
  },
  emitOverSocketId: (socketId, eventName, data) => {
    console.log(`Emit ${eventName}`, socketId, data)
    // global.io.emit(eventName, data);
    global.io.to(`${socketId}`).emit(eventName, data)
  }

}
