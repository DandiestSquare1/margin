exports.displayByTicker = function (req, res) {
    res.render('stock', {
        title: 'Margin',
        uid: req.user._id,
        ticker: req.params.ticker,
        message: {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};

exports.emptyParams = function (req, res) {
    if (req.query.ticker)
        req.flash('notice', 'The stock ticker, "' + req.query.ticker + '", does not exist or could not be found.');
    else
        req.flash('notice', 'You did not enter a valid stock ticker.');
    res.redirect('/dashboard');
};

exports.allTransactions = function (req, res) {
    res.render('all', {
        title: 'Margin',
        uid: req.user._id,
        message: {
            notice: req.flash('notice'),
            warning: req.flash('warn')
        }
    });
};
