// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const signale = require('signale');

// Adding some cool features in default console like show origin filenames, color etc.
console = signale; // eslint-disable-line no-global-assign
const {
  port, env, signaleConfig,
} = require('./config/vars');

console.config(signaleConfig);

const app = require('./config/express');


// open mongoose connection

// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
