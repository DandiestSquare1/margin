'use strict';

requirejs.config({
    appDir: ".",
    baseUrl: "javascripts",
    paths: {
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
        'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
        'q': '//cdnjs.cloudflare.com/ajax/libs/q.js/1.0.1/q',
        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min',
        'app': 'app'
    },
    shim: {
        'underscore' : { exports : '_' },
        'jquery' : { exports : '$' },
        'q' : { exports : 'q' },
        'angular' : { exports : 'angular' },
        'bootstrap' : { deps : ['jquery'] },
        'app' : { deps: ['angular', 'jquery', 'underscore', 'q'] }
    }
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require([
    'underscore',
    'jquery',
    'bootstrap',
    'q', 
	'angular',
	'app'
], function (_, $, bootstrap, q, angular, app) {    
    angular.element().ready(function () {
        angular.resumeBootstrap([app['name']]);
    });
    console.log('All dependencies/packages loaded.');
});