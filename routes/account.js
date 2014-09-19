var Q = require('q');
var token = require('../config/token');
var User = require('../models/user');
var mailer = require('../config/mailer');

exports.forceConfirmation = function (req, res) {
    req.logout();
    req.flash('notice', 'Please confirm your account. An email has been sent to your email address.');
    res.redirect('/');
};

exports.confirm = function (req, res) {
    token.confirmUser(req.query.email, req.query.token);
    console.log('Account confirmed.');
    req.flash('notice', 'Your account has been confirmed. You may now proceed.');
    res.redirect('/sign_in');
};

exports.forgotPassword_build = function (req, res) {
    res.render('forgot_password', {
        title: 'Margin',
        message : {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};

exports.forgotPassword = function (req, res) {
    console.log('Forgotten password gateway used.');
    token.setFlag(req.body.email);
    req.flash('notice', 'An email has been sent to your email address with reset instructions.');
    res.redirect('/');
};

exports.changePassword_build = function (req, res) {
    token.checkPasswordChange(req.query.email, req.query.token).then(function (shouldChange) {
        console.log('out');
        if (shouldChange) {
            res.render('change_password', {
                title: 'Margin',
                message : {
                    notice: req.flash('notice'),
                    warning: req.flash('warn')
                }
            });
        } else {
            res.end();
            req.flash('notice', 'Invalid credentials. Try requesting a password change again.');
            res.redirect('/user/forgot_password');
        }
    }, function (err) {
        console.log(err);
    });
};

exports.changePassword = function (req, res) {
    console.log('Change password gateway used.');
    token.changePassword(req.body.email, req.body.password).then(function (changed) {
        if (changed) {
            req.flash('notice', 'Password successfully changed.');
            res.redirect('/sign_in');
        } else {
            req.flash('notice', 'Invalid credentials. Try requesting a password change again.');
            res.redirect('/user/forgot_password');
        }
    }, function (err) {
        console.log(err);
    });
};

exports.displayById = function (req, res) {
    User.findOne({ _id : req.param('id') }, function (err, user) {
        if (err)
            return done(err);
        res.send({
            email    : user.email,
            userName : user.userName,
            game     : user.game
        });
    });
}

exports.updateById = function (req, res) {
    User.findOne({ _id : req.param('id') }, function (err, user) {
        if (err)
            return done(err);
        if (req.query.email)
            user.email = req.query.email;
        if (req.query.userName)
            user.userName = req.query.userName;
        if (req.query.game)
            user.game = req.query.game;
        user.save(function (err) {
            if (err)
                throw err;
            else
                console.log("User successfully updated.");
        });
        res.send();
    });
};