var app = angular.module('MarginApp', []);

/*app.factory('User', function ($http) {
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
});*/

app.controller('MainCntrl', ['$scope', '$http', function ($scope, $http) {
    $scope.user;
    $scope.init = function (id) {
        $http.get('/api/user/' + id)
        .success(function (data, status, headers, config) {
            $scope.user = data;
        })
        .error(function (data, status, headers, config) {
            console.log('err: ' + status + ', ' + config);
        });
    }
}]);

app.controller('DashCntrl', ['$scope', function ($scope) {
    $scope.startGame = function () {}
}]);