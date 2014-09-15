var Q = require('q');
var User = require('../models/user');
var mailer = require('./mailer');

exports.confirmUser = function (email, token) {
    User.findOne({ 'email' : email, 'token' : token }, function (err, user) {
        if (err)
            return done(err);
        if (user) {
            user.confirmed = true;
            user.token = '';
            user.save(function (err) {
                if (err)
                    console.log(err);
            });
        }
    });
};

exports.setFlag = function (email) {
    User.findOne({ 'email' : email }, function (err, user) {
        if (err)
            return done(err);
        if (user) {
            user.flag.state = true;
            user.flag.token = user.generateHash(email);
            user.save(function (err) {
                if (err)
                    console.log(err);
                mailer.setNewPassword(email, user.flag.token);
            });
        }
    });
};

exports.checkPasswordChange = function (email, token) {
    var deferred = Q.defer();
    User.findOne({ 'email' : email }, function (err, user) {
        if (err)
            deferred.reject(err);
        else
            if (user && user.flag.state && user.flag.token == token)
                deferred.resolve(user.flag.state);
    });
    return deferred.promise;
};

exports.changePassword = function (email, password) {
    var deferred = Q.defer();
    User.findOne({ 'email' : email }, function (err, user) {
        if (err)
            deferred.reject(err);
        if (user) {
            if (user.flag.state && user.flag.token) {
                user.password = user.generateHash(password);
                user.flag.state = false;
                user.flag.token = '';
            }
            user.save(function (err) {
                if (err)
                    deferred.reject(err);
                deferred.resolve(!user.flag.state);
            });
        }
    });
    return deferred.promise;
};