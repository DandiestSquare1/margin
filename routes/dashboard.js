/*
 * GET dashboard page.
 */

exports.build = function (req, res) {
    res.render('dashboard', {
        title: 'Margin',
        uid: req.user._id,
        message : {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};