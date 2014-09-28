var Q = require('q');
var User = require('../../models/user');

exports.displayById = function (req, res) {
    function findUser() {
        var deferred = Q.defer();
        User.findOne({ _id : req.params.id }, function (err, user) {
            if (err)
                deferred.reject(err);
            if (user)
                deferred.resolve({
                    _id      : user._id,
                    email    : user.email,
                    userName : user.userName,
                    game     : user.game
                });
            else {
                deferred.reject('API error.');
                res.send({
                    Check : 'yourself before you wreck yourself, fool.',
                    Um : "maybe you're not authorized to do this.",
                    Uh : "maybe the user doesn't exist."
                });
            }
        });
        return deferred.promise;
    }
    findUser().then(function (data) {
        res.json(data);
    }, function (err) {
        console.log(err);
    });
}

exports.updateById = function (req, res) {
    function updateUser() {
        var deferred = Q.defer();
        User.findOne({ _id : req.params.id }, function (err, user) {
            if (err)
                deferred.reject(err);
            if (req.body.email)
                user.email = req.body.email;
            if (req.body.userName)
                user.userName = req.body.userName;
            if (req.body.game) {
                if (req.body.game.started)
                    user.game.started = req.body.game.started;
                if (req.body.game.amount)
                    user.game.amount = req.body.game.amount;
                if (req.body.game.transaction)
                    user.game.transactions.push(req.body.game.transaction);
                user.game.startedOn = Date.now();
            }
            if (user)
                user.save(function (err) {
                    if (err)
                        deferred.reject(err);
                    else {
                        console.log("User successfully updated.");
                        deferred.resolve(user);
                    }
                });
            else {
                deferred.reject('API error.');
                res.send({
                    Check : 'yourself before you wreck yourself, fool.',
                    Um : "maybe you're not authorized to do this.",
                    Uh : "maybe the user doesn't exist."
                });
            }
        });
        return deferred.promise;
    }
    updateUser().then(function (user) {
        res.send(user);
    }, function (err) {
        console.log(err);
    });
};