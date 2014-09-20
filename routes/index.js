
/*
 * GET home page.
 */

exports.index = function (req, res) {
    if (req.user)
        res.render('index', {
            title: 'Margin',
            uid: req.user._id,
            message : {
                notice: req.flash('notice'),
                warning: req.flash('warn')
            }
        });
    else
        res.render('index', {
            title: 'Margin',
            message : {
                notice: req.flash('notice'),
                warning: req.flash('warn')
            }
        });
};