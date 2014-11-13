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

.controller('StockCntrl', ['$scope', '$http', 'User', 'StockData', function ($scope, $http, User, StockData) {
    $scope.maxPossibleShares = 1;
    $scope.$watch('stock', function () {
        if ($scope.$parent.user) {
            $scope.assets = $scope.$parent.user.game.amount;
            $scope.maxPossibleShares = Math.floor($scope.assets / $scope.stock.LastPrice);
        }
    });
    $scope.render = function (ticker) {
        $scope.orderPath = '/order/' + ticker;
        StockData.getQuote(ticker).then(function (data) {
            $scope.stock = data;
            _.defer(function () { $scope.$apply(); });
        });
    }
    $scope.$watch('numShares', function () {
        if ($scope.$parent.user)
            $scope.assets = $scope.$parent.user.game.amount - ($scope.stock.LastPrice * $scope.numShares);
    });
}]);
