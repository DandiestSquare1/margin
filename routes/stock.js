var Q = require('q');
var request = require('request');

exports.lookupData = function (req, res) {
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

exports.quoteData = function (req, res) {
    function callAPI() {
        var deferred = Q.defer();
        if (req.params.ticker)
            request('http://dev.markitondemand.com/Api/v2/Quote/json?symbol=' + req.params.ticker, function (err, resp, body) {
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

exports.displayByTicker = function (req, res) {
    res.render('stock', {
        title: 'Margin',
        uid: req.user._id,
        ticker: req.params.ticker,
        message: {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};

exports.emptyParams = function (req, res) {
    req.flash('notice', 'That symbol does not exist or could not be found.');
    res.redirect('/dashboard');
};