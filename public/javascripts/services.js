define(['angular', 'Q'], function (angular, Q) {
    
    angular.module('MarginApp.services', [])

    .service('User', ['$http', function ($http) {
        this.get = function (id) {
            var deferred = Q.defer();
            if (id) {
                $http.get('/api/user/' + id)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            } else {
                // do something...
            }
            return deferred.promise;
        };
        this.post = function (id, params) {
            var deferred = Q.defer();
            if (id && params) {
                $http.post('/api/user/' + id, params)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            } else if (id && !params) {
                // do something...
            }
            return deferred.promise;
        };
    }])

    .service('StockData', ['$http', function ($http) {
        this.getQuote = function (ticker) {
            var deferred = Q.defer();
            if (ticker) {
                $http.get('/api/stock/quote/' + ticker)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            } else {
                // do something...
            }
            return deferred.promise;
        };
    }]);
});