var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
        user: process.env.MANDRILL_USER,
        pass: process.env.MANDRILL_KEY
    }
}));

var mailOptions = {
    from: 'Margin Finance <no-reply@margin.sachanganesh.com>', // sender address
    to: 'foo@bar.com', // list of receivers
    subject: 'Default', // Subject line
    text: 'Default' // plaintext body
};

exports.confirmAccount = function (userName, email) {
    var opts = mailOptions;
    opts.to = email;
    opts.subject = 'Confirm Account at Margin';
    opts.text = 'Yoooo sup?';
    transporter.sendMail(opts, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log('Message sent: ' + info.response);
    });    
    
};