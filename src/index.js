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
const mongoose = require('./config/mongoose');

// to do remove below line when gooogle apis implementation done
require('./api/services/googleProviders.js');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

/**
* Exports express
* @public
*/
module.exports = app;
