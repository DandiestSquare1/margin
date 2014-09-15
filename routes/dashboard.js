/*
 * GET dashboard page.
 */

exports.build = function (req, res) {
    res.render('dashboard', {
        title: 'Margin',
        user: req.user,
        message : {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};