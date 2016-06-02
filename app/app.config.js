'use strict';

angular.
module('propertyCrossWebApp').
config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/initial-state', {
                template: '<initial-state></initial-state>'
            })
            .when('/search-results', {
                template: '<search-results></search-results>'
            })
            .when('/result-details/:index', {
                template: '<result-details></result-details>'
            })
            .otherwise({redirectTo: '/initial-state'});
    }]);