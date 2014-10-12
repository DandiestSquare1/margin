'use strict';

define([
	'angular',
	'controllers',
    'services',
    'directives'
	], function (angular, controllers, services, directives) {
    // App level module
    return angular.module('MarginApp', ['MarginApp.controllers', 'MarginApp.services', 'MarginApp.directives']);
});

//angular.module('MarginApp', ['MarginApp.controllers', 'MarginApp.services', 'MarginApp.directives']);
