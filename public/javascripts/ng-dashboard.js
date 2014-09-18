var app = angular.module('DashboardApp', []);

app.controller('DashCntrl', function ($scope) {
    $scope.user = {
        name: null,
        game: null
    }
    $scope.initUser = function (userName, gameData) {
        $scope.user.name = userName;
        $scope.user.game = gameData;
        console.log($scope.user.name.toString());
    }
});