var app = angular.module('DashboardApp', []);

app.controller('DashCntrl', function ($scope) {
    $scope.user;
    $scope.initUser = function (current_user) {
        $scope.user = current_user;
    }
    $scope.startGame = function () {
        $.get('/api/user/' + $scope.user._id,
            function (data) {
                console.log('lel');
            }, function (err) {
                console.log(err);
        });
    }
});