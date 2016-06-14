'use strict';

angular.
    module('propertyCrossWebApp').
    config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
                            templateUrl: 'initial-state/initial-state-partials/initial-state-header.template.html'
                        },
                        'title@initialState': {
                            templateUrl: 'initial-state/initial-state-partials/initial-state-title.template.html'
                        },
                        'searching@initialState': {
                            templateUrl: 'initial-state/initial-state-partials/initial-state-searching.template.html'
                        },
                        'recentResults@initialState': {
                            templateUrl: 'initial-state/initial-state-partials/initial-state-recent-results.template.html'
                        },
                        'popupOpen@initialState': {
                            templateUrl: 'initial-state/popups-partials/initial-state-popup-open.template.html'
                        },
                        'popupMap@initialState': {
                            templateUrl: 'initial-state/popups-partials/initial-state-popup-map.template.html'
                        }
                    }
                }
            )
            .state('searchResults', {
                url: '/search-results',
                views: {
                    '': {
                        template: '<search-results></search-results>'
                    },
                    'headerNavigation@searchResults': {
                        templateUrl: 'common-partials/header-navigation-partial.html'
                    },
                    'pageNavigation@searchResults': {
                        templateUrl: 'search-results/search-results-partials/search-results-page-navigation.template.html'
                    },
                    'pagination@searchResults': {
                        templateUrl: 'search-results/search-results-partials/search-results-pages.template.html'
                    },
                }
            })
            .state('favouritesList', {
                url: '/favourites-list',
                views: {
                    '': {
                        template: '<favourites-list></favourites-list>'
                    },
                    'headerNavigation@favouritesList': {
                        templateUrl: 'common-partials/header-navigation-partial.html'
                    },
                    'title@favouritesList': {
                        templateUrl: 'favourites-list/favourites-list-partials/favourites-list-header.template.html'
                    },
                    'emptyList@favouritesList': {
                        templateUrl: 'favourites-list/favourites-list-partials/favourites-list-empty.template.html'
                    },
                    'faveResults@favouritesList': {
                        templateUrl: 'favourites-list/favourites-list-partials/favourites-list-results.template.html'
                    }
                }
            })
            .state('resultDetails', {
                url: '/result-details/:index',
                views: {
                    '': {
                        template: '<result-details></result-details>'
                    },
                    'headerNavigation@resultDetails': {
                        templateUrl: 'common-partials/header-navigation-partial.html'
                    },
                    'title@resultDetails': {
                        templateUrl: 'common-partials/result-details/result-details-partials/result-details-title.template.html'
                    },
                    'information@resultDetails': {
                        templateUrl: 'common-partials/result-details/result-details-partials/result-details-information.template.html'
                    }
                },
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
                }
            });
    });