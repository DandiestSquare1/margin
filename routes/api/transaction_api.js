var Q = require('q');
var Transaction = require('../../models/transaction');

exports.getData = function (req, res) {
    res.json({ success : true });
};

exports.create = function (req, res) {
    function createRequest() {
        var deferred = Q.defer();
        if (req.body.symbol && req.body.amount && req.body.price) {
            var newRequest = new Transaction();
            newRequest.symbol = req.body.symbol;
            newRequest.time = Date.now();
            newRequest.amount = req.body.amount;
            newRequest.price = req.body.price;
            newRequest.user = req.user._id;
            newRequest.save(function (err) {
                if (err)
                    deferred.reject(err);
                else {
                    console.log('Transaction successfully created.');
                    deferred.resolve({
                        transaction: newRequest,
                        amount     : req.user.game.amount - (req.body.price * req.body.amount)
                    });
                }
            });
        } else
            deferred.reject({ error: 'Empty params' });
        return deferred.promise;
    }
    createRequest().then(function (data) {
        res.json(data);
    }, function (err) {
        console.log(err);
    });
};