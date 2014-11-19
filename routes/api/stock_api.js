var Q = require('q');
var request = require('request');
var ObjectId = require('mongoose').Types.ObjectId;
var Stock = require('../../models/stock');
var Transaction = require('../../models/transaction');

function callAPI(ticker, data) {
    var deferred = Q.defer();
    if (ticker)
        request('http://dev.markitondemand.com/Api/v2/' + data + '/json?symbol=' + ticker, function (err, resp, body) {
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
    callAPI(req.params.ticker, "Lookup").then(function (data) {
        res.json(JSON.parse(data));
    });
};

exports.quoteData = function (req, res) {
    callAPI(req.params.ticker, "Quote").then(function (data) {
        res.json(JSON.parse(data));
    });
};

exports.createNew = function (req, res) {
    function createStock(stock) {
        var deferred = Q.defer();
        stock.symbol = req.body.symbol;
        stock.amount = req.body.numberOfShares;
        stock.valueChange = 0;
        stock.user = new ObjectId(req.body.id.id);
        callAPI(req.body.symbol, "Quote").then(function (data) {
            stock.price = JSON.parse(data).LastPrice;
            deferred.resolve(stock);
        });
        return deferred.promise;
    }
    if (req.body.numberOfShares && req.body.numberOfShares > 0) {
        var stock = new Stock();
        createStock(stock).then(function (data) {
            data.save(function (err) {
                if (err)
                    console.log(err);
                res.send(data);
            });
        });
    }
}
