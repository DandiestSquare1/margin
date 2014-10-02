var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport({
    service: 'Mandrill',
    auth: {
        user: process.env.MANDRILL_USER.toString(),
        pass: process.env.MANDRILL_KEY.toString()
    }
});

var mailOptions = {
    from: 'Margin Finance <no-reply@margin.sachanganesh.com>', // sender address
    to: 'foo@bar.com', // list of receivers
    subject: 'Default', // Subject line
    text: 'Default' // plaintext body
};

exports.confirmAccount = function (email, token) {
    var urlBase = 'localhost:3000'
    if (process.env.NODE_ENV == 'production')
        urlBase = 'www.onmargin.org'
    var url = 'http://' + urlBase + '/user/confirm?email=' + email + '&token=' + token;
    var opts = mailOptions;
    opts.to = email;
    opts.subject = 'Confirm Account at Margin';
    opts.html = '<h1>Welcome to Margin.</h1><a href="' + url + '">Confirm Account</a>';
    transporter.sendMail(opts, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log('Message sent: ' + info.response);
    });
};

exports.setNewPassword = function (email, token) {
    var urlBase = 'localhost:3000'
    if (process.env.NODE_ENV == 'production')
        urlBase = 'www.onmargin.org'
    var url = 'http://' + urlBase + '/user/change_password?email=' + email + '&token=' + token;
    var opts = mailOptions;
    opts.to = email;
    opts.subject = 'Change Password for Margin Account';
    opts.html = '<h1>Hey there!</h1><a href="' + url + '">Change your password.</a>';
    transporter.sendMail(opts, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log('Message sent: ' + info.response);
    });
};
