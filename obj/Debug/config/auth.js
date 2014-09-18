﻿var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

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
                    newUser.save(function (err) {
                        if (err)
                            throw err;
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
            if (!user.validPassword(password))
                return done(null, false, req.flash('warn', 'Oops! Wrong password.'));
            return done(null, user);
        });

    }));
};