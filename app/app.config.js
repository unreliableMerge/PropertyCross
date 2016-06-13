'use strict';

angular.
module('propertyCrossWebApp').
config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $stateProvider
        .state('initial-state', {
                //name: 'initialState',
                url: '/initial-state',
                template: '<initial-state></initial-state>'
            }
        )
        .state('search-results', {
            //name: 'searchResults',
            url: '/search-results',
            template: '<search-results></search-results>'
        })
        .state('result-details', {

            url: '/result-details/:index',
            template: '<result-details></result-details>',
            resolve: {
                PreviousState: [
                    "$state",
                    function ($state) {
                        var currentStateData = {
                            Name: $state.current.name,
                            Params: $state.params,
                            URL: $state.href($state.current.name, $state.params)
                        };
                        return currentStateData;
                    }
                ]
                //prevRoutePromiseGetter: function ($q, $rootScope) {
                //    var deferred = $q.defer();
                //    var dereg = $rootScope.$on('$routeChangeSuccess',
                //        function (evt, next, prev) {
                //            dereg();
                //            if (prev != undefined) {
                //                deferred.resolve((prev.originalPath || '').substr(1));
                //            }
                //            else {
                //                deferred.resolve((next.originalPath || '').substr(1));
                //            }
                //        }
                //    );
                //    return function () {
                //        return deferred.promise;
                //    };
                //}
            }
        })
        .state('favourites-list', {
            //name: 'favouritesList',
            url: '/favourites-list',
            template: '<favourites-list></favourites-list>'
        });
    $urlRouterProvider.otherwise('/initial-state');
});