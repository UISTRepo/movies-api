var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var moviesRouter = require('./routes/movies');
var actorsRouter = require('./routes/actors');

const dotenv = require('dotenv');

// get config vars
dotenv.config();

var app = express();

app.use('/api', require('cors')());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/actors', actorsRouter);

module.exports = app;
