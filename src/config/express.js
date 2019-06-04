const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
// const Ddos = require('ddos');
const routes = require('../api/v1/routes');
const strategies = require('./passport');
const error = require('../api/middlewares/error');
const { whitelist } = require('./vars');
const _expressLogs = require('express-server-logs');
const busboy = require('connect-busboy');


// const ddosInstance = new Ddos(ddosConfig);
const corsOptions = {
  origin(origin, callback) {
    if (!whitelist || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};


/**
* Express instance
      * @public
          */
const app = express();
const xlogs = new _expressLogs(false);

// npm module for preventing ddos attack. See more https://www.npmjs.com/package/ddos
// app.use(ddosInstance.express);

// request logging. dev: console | production: file
// app.use(morgan(logs));


// parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(xlogs.logger);


// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions));

// enable authentication
app.use(passport.initialize());
app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));

passport.use('jwt', strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
