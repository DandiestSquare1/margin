angular.module('MarginApp.directives', [])

.directive('enterPress', function () {
    return function ($scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                $scope.$apply(function () {
                    if (attrs.enterPress.length > 0)
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
        $scope.$watch('maxPossibleShares', function () {
            attrs.$set('max', attrs.maxVal);
        });
    };
});
