'use strict';

angular.
module('catalogApp').
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/phones', {
            template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
            template: '<phone-detail></phone-detail>'
        }).
        when('/about', {
            template: '<about></about>'
        }).
        when('/contact', {
            template: '<contact></contact>'
        }).
        otherwise('/phones');
    }
]);