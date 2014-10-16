module.exports = angular.module('MarginApp.controllers', ['MarginApp.services'])

.controller('MainCntrl', ['$scope', '$http', 'User', function ($scope, $http, User) {
    $scope.init = function (id) {
        if (id)
            User.get(id).then(function (data) {
                $scope.user = data;
                _.defer(function () { $scope.$apply(); });
            });
    };
}])

.controller('DashCntrl', ['$scope', '$http', 'User', function ($scope, $http, User) {
    $scope.stockTicker = 'GOOG';
    $scope.startGame = function () {
        $scope.$parent.user.game.started = true;
        User.post($scope.$parent.user._id, $scope.$parent.user).then(function (data) {
            _.defer(function () { $scope.$apply(); });
        });
    };
}])

.controller('StockCntrl', ['$scope', '$http', 'User', 'StockData', 'Socket', function ($scope, $http, User, StockData, Socket) {
    $scope.maxPossibleShares = 1;
    $scope.$watch('stock', function () {
        if ($scope.$parent.user)
            $scope.maxPossibleShares = Math.floor($scope.$parent.user.game.amount / $scope.stock.LastPrice);
    });
    $scope.render = function (ticker) {
        StockData.getQuote(ticker).then(function (data) {
            $scope.stock = data;
            _.defer(function () { $scope.$apply(); });
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
    $scope.updateData = function () {
        //Socket.on('change:$scope.stock.LastPrice');
    }
}]);
