// make bluebird default Promise
Promise = require('bluebird') // eslint-disable-line no-global-assign
const signale = require('signale')

// Adding some cool features in default console like show origin filenames, color etc.
console = signale // eslint-disable-line no-global-assign
const {
  port, env, signaleConfig, socketPort, socketUrl
} = require('./config/vars')

console.config(signaleConfig)

const app = require('./config/express')
const socketUtils = require('./config/socketUtils')
const server = require('http').createServer(app)

global.io = require('socket.io').listen(server)
// server.listen(socketPort, socketUrl, () => console.info(`socket server started on ${socketUrl}:${socketPort}`));


socketUtils.newConnection()

// open mongoose connection

// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`))

/**
* Exports express
* @public
*/
module.exports = app
