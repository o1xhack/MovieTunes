// Xuefei Liu
// Yuxiao Wang


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SpotifyWebApi = require("spotify-web-api-node");
const tmdb = require('tmdb-v3');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const passport = require('passport');
//const oauth = require('oauth');
//const passport = require('passport-jwt');

var index = require('./routes/index');
var users = require('./routes/users');
var spotify_routes = require('./routes/spotify');
var tmdb_routes = require('./routes/tmdb');
var tone_routes = require('./routes/tone');
var api_routes = require('./routes/api');
const auth = require('./routes/authTwitter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Pass anything other than mounted routes to Angular
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'this is not a secret' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
//app.use('/users', users);
app.use('/spotify', spotify_routes);
app.use('/tmdb', tmdb_routes);
app.use('/tone', tone_routes);
app.use('/api', api_routes);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
