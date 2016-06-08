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
                        template: '<result-details></result-details>',
                        resolve: {
                            prevRoutePromiseGetter: function ($q, $rootScope) {
                                var deferred = $q.defer();
                                var dereg = $rootScope.$on('$routeChangeSuccess',
                                    function (evt, next, prev) {
                                        dereg();
                                        if (prev != undefined) {
                                            deferred.resolve((prev.originalPath || '').substr(1));
                                        }
                                        else {
                                            deferred.resolve((next.originalPath || '').substr(1));
                                        }
                                    }
                                );
                                return function () {
                                    return deferred.promise;
                                };
                            }
                        }
                    })
                    .when('/favourites-list', {
                        template: '<favourites-list></favourites-list>'
                    })
                    .otherwise({redirectTo: '/initial-state'});
            }
]);