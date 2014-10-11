var mongoose = require('mongoose');

// transaction model
var stockSchema = mongoose.Schema({
    symbol       : String,
    price        : Number,
    valueChange  : Number,
    user         : { type: mongoose.Schema.ObjectId, ref: 'User' }
});

// create the model for transactions
module.exports = mongoose.model('Stock', transactionSchema);