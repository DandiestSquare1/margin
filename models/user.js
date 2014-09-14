var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// user model
var userSchema = mongoose.Schema({
    userName     : String,
    email        : String,
    password     : String,
    confirmed    : { type: Boolean, default: false },
    token        : String,
    flag         : {
        state    : { type: Boolean, default: false },
        token    : { type: String }
    }
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(process.env.SALT), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users
module.exports = mongoose.model('User', userSchema);