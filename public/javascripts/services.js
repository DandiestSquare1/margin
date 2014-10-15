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
        $http.get('/api/stock/quote/' + ticker)
        .success(function (data, status, headers, config) {
            if (data.Symbol)
                deferred.resolve(data);
            else {
                deferred.reject(data);
                window.location = '/stock?ticker=' + ticker;
            }
        })
        .error(function (data, status, headers, config) {
            deferred.reject(status);
        });
        return deferred.promise;
    };
}])

.factory('Socket', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback)
                        callback.apply(socket, args);
                });
            })
        }
    };
});
