exports.explain = function (req, res) {
    if (req.user)
        res.render('about', {
            title: 'Margin',
            uid: req.user._id,
            message : {
                notice: req.flash('notice'),
                warning: req.flash('warn')
            }
        });
    else
        res.render('about', {
            title: 'Margin',
            message : {
                notice: req.flash('notice'),
                warning: req.flash('warn')
            }
        });
};