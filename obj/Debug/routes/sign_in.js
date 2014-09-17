/*
 * GET sign in page.
 */

exports.createSession = function (req, res) {
    res.render('sign_in', {
        title: 'Margin',
        message : {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};