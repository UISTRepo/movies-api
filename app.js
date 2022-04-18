var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var moviesRouter = require('./routes/movies');
var actorsRouter = require('./routes/actors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/movies', moviesRouter);
app.use('/actors', actorsRouter);

module.exports = app;
