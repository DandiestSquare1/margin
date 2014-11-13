var Q = require('q');
var Transaction = require('../../models/transaction');

exports.getData = function (req, res) {
    Transaction.find({}, function(err, transactions) {
        res.send(transactions.reduce(function(transactionMap, item) {
            transactionMap[item.id] = item;
            return transactionMap;
        }, {}));
    });
};

exports.createNew = function (req, res) {
    var purchase;
    function createTransaction() {
        var deferred = Q.defer();
        purchase = new Transaction();
        purchase.stock = req.body.stock._id;
        purchase.grossCost = req.body.stock.amount * req.body.stock.price;
        purchase.createdOn = Date.now();
        purchase.user = req.user._id;
        deferred.resolve(purchase);
        return deferred.promise;
    }
    createTransaction().then(function (data) {
        if (data.grossCost <= req.user.game.amount)
            data.save(function (err) {
                if (err)
                    console.log(err);
            }, function () {
                res.send(data);
            });
    });
};
