'use strict';

angular.
module('propertyCrossWebApp').
config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
    when('/initial-state', {
        template: '<initial-state></initial-state>'
    }).
    otherwise({redirectTo: '/initial-state'});
}]);