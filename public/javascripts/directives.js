angular.module('MarginApp.directives', [])

.directive('enterPress', function () {
    return function ($scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                $scope.$apply(function () {
                    window.location = '/stock/' + attrs.enterPress;
                    $scope.$eval(attrs.enterPress);
                });
                event.preventDefault();
            }
        });
    };
})

.directive('maxVal', function () {
    return function ($scope, element, attrs) {
        console.log($scope);
        attrs.$set('max', $scope.maxPossibleShares);
    };
});