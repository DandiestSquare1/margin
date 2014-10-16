require('../../bower_components/underscore/underscore-min.js');
require('../../bower_components/q/q.js');

require('../../bower_components/angular/angular.min.js');
require('../../bower_components/angular-socket-io/socket.min.js');

angular.module('MarginApp', ['MarginApp.controllers', 'MarginApp.services', 'MarginApp.directives']);

require('./constrollers.js');
require('./services.js');
require('./directives.js');
