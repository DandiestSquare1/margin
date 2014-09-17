
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
        title: 'Margin',
        message : {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};