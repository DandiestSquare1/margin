var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var mailer = require('./mailer');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            if (!email)
                return done(null, false, req.flash('warn', 'Enter an email address.'));
            if (!password)
                return done(null, false, req.flash('warn', 'Enter a password.'));
                res.redirect('/sign_up');
            User.findOne({ 'email' : email }, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('warn', 'That email is already taken.'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    newUser.userName = req.body.userName;
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.token = newUser.generateHash(newUser.id);
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        mailer.confirmAccount(newUser.email, newUser.token);
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, email, password, done) {
        User.findOne({ 'email' : email }, function (err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('warn', 'No user found.'));
            if (!user.confirmed)
                return done(null, false, req.flash('warn', 'Account has not been confirmed.'));
            if (!user.validPassword(password))
                return done(null, false, req.flash('warn', 'Oops! Wrong password.'));
            return done(null, user);
        });

    }));
};
