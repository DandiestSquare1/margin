var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// user model
var userSchema = mongoose.Schema({
    email        : String,
    password     : String
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users
module.exports = mongoose.model('User', userSchema);