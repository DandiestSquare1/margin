var app = angular.module('DashboardApp', []);

app.controller('DashCntrl', function ($scope) {
    $scope.user;
    $scope.initUser = function (current_user) {
        $scope.user = current_user;
    }
});