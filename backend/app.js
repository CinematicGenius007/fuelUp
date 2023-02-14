#!/usr/bin/env node
require('dotenv').config();

const debug = require('debug')('backend:server');
const http = require('http');

const createError = require('http-errors');
const express = require('express');
const expressListRoutes = require('express-list-routes');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');

const {tokenValidation} = require('./middlewares/authentication');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user/index');
const supplierRouter = require('./routes/supplier/index');
const distributorRouter = require('./routes/distributor/index');
const zoneRouter = require('./routes/zone/index');
const unitRouter = require('./routes/unit/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.log('Connection error:', error);
});

app.use((req, _, next) => {
  req.db = db;
  next();  
});

// Use the auth middlewares
app.use(tokenValidation);

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/supplier', supplierRouter);
app.use('/distributor', distributorRouter);
app.use('/zone', zoneRouter);
app.use('/unit', unitRouter);

// List all routes
// expressListRoutes(app, { prefix: '' });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Code for running the http server

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3333');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
