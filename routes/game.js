var Q = require('q');
var User = require('../models/user');

exports.startGame = function (email) {
    User.findOne({ 'email' : email}, function () {

    });
}