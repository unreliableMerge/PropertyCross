'use strict';


angular.module("dataService").factory("dataServiceFactory", ['$http',
    function ($http) {

    return {
        dataResponse: function (inputSearch) {
           return $http.jsonp('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&place_name=' +
                inputSearch + '&callback=JSON_CALLBACK')
                .then(function (response) {
                    return response.data.response.listings;
                });
        }
    };
}]);