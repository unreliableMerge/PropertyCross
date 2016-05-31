'use strict';

angular.
    module('propertyCrossWebApp').
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.when('/searching-list', {
            template: '<property-cross></property-cross>'
        }).otherwise({redirectTo: '/searching-list'});
}]);
