var mongoose = require('mongoose');

// transaction model
var transactionSchema = mongoose.Schema({
    symbol       : String,
    time         : Date,
    amount       : Number,
    price        : Number,
    user         : { type: mongoose.Schema.ObjectId, ref: 'User' }
});

// create the model for transactions
module.exports = mongoose.model('Transaction', transactionSchema);