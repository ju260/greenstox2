var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var minPer = require('./routes/minPer');
var maxPer = require('./routes/maxPer');
var minDividend = require('./routes/minDividend');
var maxDividend = require('./routes/maxDividend');
var detailStockRouter = require('./routes/detailStock');
var detailStock2Router = require('./routes/detailStock-2');


var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.set('trust proxy', 1) // trust first proxy

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/minPer', minPer);
app.use('/maxPer', maxPer);
app.use('/minDividend', minDividend);
app.use('/maxDividend', maxDividend);
app.use('/detailStock', detailStockRouter);
app.use('/detailStock-2', detailStock2Router);

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

module.exports = app;
