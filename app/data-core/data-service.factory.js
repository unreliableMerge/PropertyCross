'use strict';


angular.module("dataService").factory("dataServiceFactory", ['$http',
    function ($http) {
        var searchingData = [];

        return {
            dataResponse: function (inputSearch) {
                return $http.jsonp('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&place_name=' +
                        inputSearch + '&callback=JSON_CALLBACK')
                    .then(function (response) {
                        searchingData = response.data.response.listings;
                        dataStoring.addInputRequest(inputSearch);
                        return searchingData;
                    });
            },
            responsedData: function () {
                if (searchingData.length == 0) {
                    var takeFromLocaleStorage = dataStoring.read();
                    $http.jsonp('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&place_name=' +
                            takeFromLocaleStorage[takeFromLocaleStorage.length - 1].recentSearchName + '&callback=JSON_CALLBACK')
                        .then(function (response) {
                            searchingData = response.data.response.listings;

                        });
                    return searchingData;
                }

                return searchingData;
            }
        };
    }]);