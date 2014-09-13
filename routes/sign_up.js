/*
 * GET sign up page.
 */

exports.createUser = function (req, res) {
    res.render('sign_up', {
        title: 'Margin',
        message : {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};