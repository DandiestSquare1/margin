/*
 * GET sign up page.
 */

exports.createUser = function (req, res) {
    res.render('sign_up', { title: 'Margin', message: req.flash('warn') });
};