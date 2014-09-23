/*
 * GET sign in page.
 */

exports.createSession = function (req, res) {
    if (!req.user)
        res.render('account/sign_in', {
            title: 'Margin',
            message : {
                notice: req.flash('notice'),
                warning: req.flash('warn')
            }
        });
    else
        res.redirect('/dashboard');
};