var Q = require('q');
var request = require('request');
var Stock = require('../../models/stock');
var Transaction = require('../../models/transaction');

exports.lookupData = function (req, res) {
    callAPI(req, "Lookup").then(function (data) {
        res.json(JSON.parse(data));
    });
};

exports.quoteData = function (req, res) {
    callAPI(req, "Quote").then(function (data) {
        res.json(JSON.parse(data));
    });
};

exports.isBought = function (req, res) {
    var newTransaction, newStock;
    if (req.body.numberOfShares && req.body.numberOfShares > 0) {
        newTransaction = new Transaction();
        newStock = new Stock();
        newStock.symbol = req.params.ticker;
        newStock.amount = req.body.numberOfShares;
        newStock.valueChange = 0;
        callAPI(req, "Quote").then(function (data) {
            newStock.price = data.LastPrice;
            newTransaction.time = Date.now();
            newTransaction.grossCost = newStock.amount * newStock.price;
            newStock.user = req.user._id;
            newTransaction.stock = newStock._id;
            newTransaction.user = req.user._id;
            if (newTransaction.grossCost <= req.user.game.amount) {
                newStock.save(function (err) {
                    if (err)
                        console.log(err);
                });
                newTransaction.save(function (err) {
                    if (err)
                        console.log(err);
                });
                req.user.game.stocks.push(newStock);
                req.user.game.transactions.push(newTransaction);
                req.user.game.amount = req.user.game.amount - newTransaction.grossCost;
                req.user.save(function (err) {
                    if (err)
                        console.log(err);
                });
            }
        });
        req.flash('notice', 'Processed transaction.');
    } else {
        req.flash('notice', 'Could not process transaction. Try again.');
    }
    res.redirect('/stock/' + req.params.ticker);
};


function callAPI(req, data) {
    var deferred = Q.defer();
    if (req.params.ticker)
        request('http://dev.markitondemand.com/Api/v2/' + data + '/json?symbol=' + req.params.ticker, function (err, resp, body) {
            if (err)
                deferred.reject(err);
            if (resp) {
                if (resp.statusCode == 200)
                    deferred.resolve(body);
            } else
                deferred.reject({ error: 'Empty params' });
        });
    else
        deferred.reject({ error: 'Empty params' });
    return deferred.promise;
}

function settleDues() {
    var deferred = Q.defer();
}
