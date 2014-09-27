var Transaction = require('../../models/transaction');

exports.getData = function (req, res) {

};

exports.create = function (req, res) {
    function createRequest() {
        var deferred = Q.defer();
        var newRequest = new Transaction();
        if (newRequest && req.body.symbol && req.body.amount && req.body.price) {
            newRequest.symbol = req.body.symbol;
            newRequest.time = Date.now();
            newRequest.amount = req.body.amount;
            newRequest.price = req.body.price;
            newRequest.user = req.user._id;
            console.log(JSON.stringify(newRequest));
            newRequest.save(function (err) {
                if (err)
                    deferred.reject(err);
                else {
                    console.log("Transaction successfully created.");
                    deferred.resolve({
                        request: newRequest,
                        amount : req.user.game.amount - req.body.price * req.body.amount
                    });
                }
            });
        } else
            deferred.reject({ status: 'Incorrect params' });
    }
    createRequest().then(function (data) {
        res.json(data);
    }, function (err) {
        console.log(err);
    });
};