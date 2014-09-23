'use strict';

define([
	'angular',
	'controllers'
	], function (angular, controllers) {
    // App level module
    return angular.module('MarginApp', ['MarginApp.controllers']);
});