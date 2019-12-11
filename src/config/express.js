const express = require('express');
const path = require('path');
const morgan = require('morgan');
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
const { whitelist, logs } = require('./vars');


// const ddosInstance = new Ddos(ddosConfig);
const corsOptions = {
  exposedHeaders: ['x-auth-token'],
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

// npm module for preventing ddos attack. See more https://www.npmjs.com/package/ddos
// app.use(ddosInstance.express);
app.use(express.static(path.join(__dirname, 'client/build')));

// request logging. dev: console | production: file
app.use(morgan(logs));


// parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



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
passport.use(strategies.twitter);

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
