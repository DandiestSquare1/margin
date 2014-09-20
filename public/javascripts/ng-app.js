var app = angular.module('MarginApp', []);

app.factory('User', function () {
    return {
        // Promise for retrieving JSON User data
        getProperties : function (id) {
            var deferred = Q.defer();
            $.getJSON('/api/user/' + id
            , function (data) {
                deferred.resolve(data);
            }).fail(function () {
                deferred.reject(true);
            });
            return deferred.promise;
        }
    };
});

app.controller('MainCntrl', ['$scope', 'User', function ($scope, User) {
    $scope.user;
    $scope.initUser = function (id) {
        User.getProperties(id).then(function (user) {
            $scope.user = user;
            console.log(JSON.stringify(user));
        }, function (err) {
            console.log(err);
        });
    }
}]);

app.controller('DashCntrl', ['$scope', function ($scope) {
    $scope.startGame = function () {}
    console.log($scope.user);
}]);