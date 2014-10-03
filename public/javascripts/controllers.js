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
    $scope.$watch('user.game.amount', function () {
        if ($scope.user)
            $http.post('/api/user/' + $scope.user._id, {
                game : $scope.user.game
            })
            .success(function (data, status, headers, config) {
                console.log('User game-amount successfully updated.');
            })
            .error(function (data, status, headers, config) {
                console.log('err: ' + status + ', ' + config);
            });
    });
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
    $('#stockTicker').keypress(function (e) {
        if (e.which == 13)
            window.location = '/stock/' + $scope.stockTicker;
    });
}])

.controller('StockCntrl', ['$scope', '$http', function ($scope, $http) {
    $scope.stock;
    $scope.render = function (ticker) {
        $http.get('/api/stock/quote/' + ticker)
        .success(function (data, status, headers, config) {
            $scope.stock = data;
            _.defer(function () { $scope.$apply(); });
            $('#buy').attr('max', Math.floor($scope.$parent.user.game.amount / $scope.stock.LastPrice));
        })
        .error(function (data, status, headers, config) {
            console.log('err: ' + status + ', ' + config);
        });
    }
    $scope.createTransaction = function () {
        if ($scope.numShares && $scope.numShares > 0 && $scope.$parent.user.game.amount - ($scope.stock.LastPrice * $scope.numShares) > 0) {
            $http.post('/api/transaction', {
                symbol : $scope.stock.Symbol,
                amount : $scope.numShares,
                price  : $scope.stock.LastPrice
            })
            .success(function (data, status, headers, config) {
                $scope.$parent.user.game.amount = data.amount;
            })
            .error(function (data, status, headers, config) {
                console.log('err: ' + status + ', ' + config);
            });
        } else {
            console.log($scope.$parent.user.game.amount - ($scope.amount * $scope.numShares) > 0);
            console.log($scope.amount);
        }
    }
}]);