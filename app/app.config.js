'use strict';

angular.module('propertyCrossWebApp').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/initial-state');
    $stateProvider
        .state('initialState', {
                url: '/initial-state',
                views: {
                    '': {
                        template: '<initial-state></initial-state>'
                    },
                    'header@initialState': {
                        templateUrl: 'initial-state/initial-state-header.template.html'
                    },
                    'searching@initialState': {
                        templateUrl: 'initial-state/initial-state-searching.template.html'
                    },
                    'recentResults@initialState': {
                        templateUrl: 'initial-state/initial-state-recent-results.template.html'
                    },
                    'popupOpen@initialState': {
                        templateUrl: 'initial-state/popUps/initial-state-popup-open.template.html'
                    },
                    'popupMap@initialState': {
                        templateUrl: 'initial-state/popUps/initial-state-popup-map.template.html'
                    }
                }
        }
        )
    // .state('searchResults', {
    //     name: 'searchResults',
    //     url: '/search-results',
    //     template: '<search-results></search-results>'
    // })
    // .state('resultDetails', {
    //     name: 'resultDetails',
    //     url: '/result-details/:index',
    //     template: '<result-details></result-details>',
    //     resolve: {
    //         PreviousState: [
    //             "$state",
    //             function ($state) {
    //                 var currentStateData = {
    //                     Name: $state.current.name,
    //                     Params: $state.params,
    //                     URL: $state.href($state.current.name, $state.params)
    //                 };
    //                 return currentStateData;
    //             }
    //         ]
    //     }
    // })
    // .state('favouritesList', {
    //     name: 'favouritesList',
    //     url: '/favourites-list',
    //     template: '<favourites-list></favourites-list>'
    // });


});