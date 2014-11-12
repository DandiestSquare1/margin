var mongoose = require('mongoose');

// transaction model
var transactionSchema = mongoose.Schema({
    stock        : { type: mongoose.Schema.ObjectId, ref: 'Stock' },
    time         : Date,
    grossCost    : Number,
    user         : { type: mongoose.Schema.ObjectId, ref: 'User' }
});

// create the model for transactions
module.exports = mongoose.model('Transaction', transactionSchema);
