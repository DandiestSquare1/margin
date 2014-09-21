var app = angular.module('MarginApp', []);
        
app.controller('MainCntrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user;
    $scope.init = function (id) {
        if (id)
            $http.get('/api/user/' + id)
            .success(function (data, status, headers, config) {
                $scope.user = data;
                console.log('Retrieved User data.');
            })
            .error(function (data, status, headers, config) {
                console.log('err: ' + status + ', ' + config);
            });
    };
}]);
        
app.controller('DashCntrl', ['$scope', '$http', function ($scope, $http) {
    $scope.startGame = function () {
        $scope.$parent.user.game.started = true;
        $http.post('/api/user/' + $scope.$parent.user._id, $scope.$parent.user).then(function () {
            console.log("Updated User's game state.");
            _.defer(function () { $scope.$apply(); });
        });
    };
}]);