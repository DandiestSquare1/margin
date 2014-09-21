requirejs.config({
    appDir: ".",
    baseUrl: "js",
    paths: {
        'underscore': ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min'],
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'],
        'bootstrap': ['//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min'],
        'q': ['//cdnjs.cloudflare.com/ajax/libs/q.js/1.0.1/q'],
        'angular': ['//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min'],
        'MarginApp': ['/javascripts/ng-app']
    },
    shim: {
        'underscore' : { exports : '_' },
        'jquery' : { exports : '$' },
        'q' : { exports : 'q' },
        'angular' : { exports : 'angular' },
        'bootstrap' : { deps : ['jquery'] },
        'MarginApp' : { deps: ['angular', 'jquery', 'underscore', 'q'] }
    }
});

require(['underscore', 'jquery', 'bootstrap', 'q', 'angular', 'MarginApp'], function (_, $, bootstrap, q, angular, margin) {
    console.log('All dependencies loaded.');
    return {};
});