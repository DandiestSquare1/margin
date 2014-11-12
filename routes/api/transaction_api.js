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
