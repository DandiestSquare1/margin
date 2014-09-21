﻿var Q = require('q');
var request = require('request');

exports.displayByTicker = function (req, res) {
    function callAPI() {
        var deferred = Q.defer();
        if (req.params.ticker)
            request('http://dev.markitondemand.com/Api/v2/Lookup/json?input=' + req.params.ticker, function (err, resp, body) {
                if (err)
                    deferred.reject(err);
                if (resp.statusCode == 200)
                    deferred.resolve(body);
            });
        else
            deferred.reject({ error: 'Empty params' });
        return deferred.promise;
    }
    callAPI().then(function (data) {
        res.json(JSON.parse(data));
    });
};