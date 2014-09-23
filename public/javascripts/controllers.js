'use strict';

angular.module('MarginApp.controllers', [])

.controller('MainCntrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user;
    $scope.init = function (id) {
        if (id)
            $http.get('/api/user/' + id)
            .success(function (data, status, headers, config) {
                $scope.user = data;
            })
            .error(function (data, status, headers, config) {
                console.log('err: ' + status + ', ' + config);
            });
    };
}])

.controller('DashCntrl', ['$scope', '$http', function ($scope, $http) {
    $scope.stockTicker = 'GOOG';
    $scope.$watch('stockTicker', function () {
        var stockOptions = [];
        if ($scope.stockTicker != '')
            $http.get('/api/stock/lookup/' + $scope.stockTicker)
            .success(function (data, status, headers, config) {
                console.log(data);
                _.each(data, function (stock) {
                    stockOptions.push(stock.Symbol);
                });
                //console.log(stockOptions);
                /*$('#stock-ticker').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                }, {
                    name: 'stockOptions',
                    displayKey: 'value',
                    source: stockOptions
                });*/
            })
            .error(function (data, status, headers, config) {
                console.log('err: ' + status + ', ' + config);
            });
    });
    $scope.startGame = function () {
        $scope.$parent.user.game.started = true;
        $http.post('/api/user/' + $scope.$parent.user._id, $scope.$parent.user).then(function () {
            console.log("Updated User's game state.");
            _.defer(function () { $scope.$apply(); });
        });
    };
}])

.controller('StockCntrl', ['$scope', '$http', function ($scope, $http) {
    $scope.stock;
    $scope.render = function (ticker) {
        $http.get('http://www.corsproxy.com/dev.markitondemand.com/Api/v2/Quote/json?symbol=' + ticker)
        .success(function (data, status, headers, config) {
            $scope.stock = data;
            _.defer(function () { $scope.$apply(); });
        })
        .error(function (data, status, headers, config) {
            console.log('err: ' + status + ', ' + config);
        });
    }
}]);