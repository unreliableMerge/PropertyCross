'use strict';

angular.
module('propertyCrossWebApp').
config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
    when('/searching-list', {
        template: '<searching-list></searching-list>'
    }).
    otherwise({redirectTo: '/searching-list'});
}]);