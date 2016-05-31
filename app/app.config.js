'use strict';

angular.module('propertyCrossWebApp',
     [
    'ngRoute'
]
);
angular.module('propertyCrossWebApp').config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
        when('/searching-list', {
        template: '<property-cross></property-cross>'
    }).
    otherwise({redirectTo: '/searching-list'});
}]);

angular.module('propertyCrossWebApp').component('propertyCross',
    {
        templateUrl: 'searching-list/searching-list.template.html',
        controller:
            function Searching() {
                
            }
    }

);
