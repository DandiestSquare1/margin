var app = angular.module('MarginApp', []);

app.factory('User', function ($http) {
    return {
        getProperties : function (id) {
            var deferred = Q.defer();
            $http.get('/api/user/' + id)
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                console.log("err: " + status + ", " + data);
                deferred.reject(false);
            });
            return deferred.promise;
        }
    };
});

app.controller('MainCntrl', ['$scope', '$http', 'User', function ($scope, $http, User) {
    $scope.user;
    function init() {
        if ($scope.uid)
            console.log('lol');
            User.getProperties($scope.uid).then(function (user) {
                $scope.$apply(function () {
                    console.log(user);
                    $scope.user = user;
                });
            }, function (err) {
                console.log(err);
            });
    }
    init();
}]);

app.controller('DashCntrl', ['$scope', function ($scope) {
    $scope.startGame = function () {}
}]);