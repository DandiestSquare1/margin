/*
 * GET dashboard page.
 */

exports.build = function (req, res) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.render('dashboard', {
        title: 'Margin',
        uid: req.user._id,
        message : {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};