var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const rateLimit = require('express-rate-limit');

var authRouter = require('./routes/auth');
var moviesRouter = require('./routes/movies');
var actorsRouter = require('./routes/actors');

const dotenv = require('dotenv');

// get config vars
dotenv.config();

var app = express();

const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use('/api', require('cors')(), apiLimiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/actors', actorsRouter);

module.exports = app;
