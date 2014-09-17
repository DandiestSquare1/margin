
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('./models/user');
var auth = require('./config/auth.js')(passport);
var schedule = require('node-schedule');

var account = require('./routes/account');
var sign_up = require('./routes/sign_up');
var sign_in = require('./routes/sign_in');
var dashboard = require('./routes/dashboard');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
// required for passport
app.use(express.cookieParser());
app.use(express.session({ secret: 'session_secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// connect to db
mongoose.connect('mongodb://localhost/margin');

/* test scheduler
var date = new Date(2014, 8, 13, 14, 3, 0, 0);
var j = schedule.scheduleJob(date, function () {
    console.log('Scheduler worked!');
});*/



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/sign_up', sign_up.createUser);

app.post('/sign_up', passport.authenticate('local-signup', {
    successRedirect : '/user/force_confirm',
    failureRedirect : '/sign_up',
    failureFlash : true
}));

app.get('/sign_in', sign_in.createSession);

app.post('/sign_in', passport.authenticate('local-login', {
    successRedirect : '/dashboard',
    failureRedirect : '/sign_in',
    failureFlash : true
}));

app.get('/dashboard', isLoggedIn, dashboard.build);

// user confirmation and password changes
app.get('/user/force_confirm', account.forceConfirmation);
app.get('/user/confirm', account.confirm);
app.get('/user/forgot_password', account.forgotPassword_build);
app.post('/user/forgot_password', account.forgotPassword);
app.get('/user/change_password', account.changePassword_build);
app.post('/user/change_password', account.changePassword);

app.get('/sign_out', function (req, res) {
    req.logout();
    res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/sign_in');
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
