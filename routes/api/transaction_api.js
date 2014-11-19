var Q = require('q');
var ObjectId = require('mongoose').Types.ObjectId;
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
    console.log("called");
    function createTransaction(purchase) {
        console.log("entered");
        var deferred = Q.defer();
        console.log(JSON.stringify(req.body.stock));
        purchase.stock = req.body.stock._id;
        purchase.grossCost = req.body.stock.amount * req.body.stock.price;
        purchase.createdOn = Date.now();
        purchase.user = new ObjectId(req.body.id.id);
        deferred.resolve(purchase);
        return deferred.promise;
    }
    var transaction = new Transaction();
    createTransaction(transaction).then(function (data) {
        console.log("final");
        if (data.grossCost <= req.body.maxAmount)
            data.save(function (err) {
                if (err)
                    console.log(err);
                res.send(data);
            });
    });
};
