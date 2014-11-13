var Q = require('q');
var request = require('request');
var Stock = require('../../models/stock');
var Transaction = require('../../models/transaction');

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

exports.createNew = function (req, res) {
    var stock;
    function createStock() {
        var deferred = Q.defer();
        stock = new Stock();
        stock.symbol = req.body.symbol;
        callAPI(req, "Quote").then(function (data) {
            stock.price = data.LastPrice;
        });
        stock.amount = req.body.numberOfShares;
        stock.valueChange = 0;
        stock.user = req.user._id;
        deferred.resolve(stock);
        return deferred.promise;
    }
    if (req.body.numberOfShares && req.body.numberOfShares > 0)
        createStock().then(function (data) {
            newStock.save(function (err) {
                if (err)
                    console.log(err);
            }, function () {
                res.send(data);
            });
        });
}
