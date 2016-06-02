'use strict';


angular.module("dataService").factory("dataServiceFactory", ['$http',
    function ($http) {
        var searchingData = {
            responsedData: [],
            pagingInformation: {}
        };

        var _dataResponse = function (inputSearch) {
            return $http.jsonp('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&place_name=' +
                inputSearch + '&callback=JSON_CALLBACK')
                .then(function (response) {
                    searchingData.responsedData = response.data.response.listings;

                    dataStoring.addInputRequest(inputSearch,
                        response.data.response.page,
                        response.data.response.total_pages,
                        response.data.response.total_results,
                        response.data.response.locations[response.data.response.locations.length - 1].title
                    );
                    searchingData.pagingInformation = ({
                        recentSearchName: inputSearch,
                        currentPage: response.data.response.page,
                        totalPages: response.data.response.total_pages,
                        totalResults: response.data.response.total_results,
                        currentCity: response.data.response.locations[response.data.response.locations.length - 1].title
                    });

                    return searchingData;
                });
        };

        var _responsedData = function () {
            if (searchingData.responsedData.length == 0) {
                var takeFromLocaleStorage = dataStoring.readInputRequest();
                return $http.jsonp('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&place_name=' +
                    takeFromLocaleStorage[takeFromLocaleStorage.length - 1].requestName + '&callback=JSON_CALLBACK')
                    .then(function (response) {
                        searchingData.responsedData = response.data.response.listings;
                        searchingData.pagingInformation = takeFromLocaleStorage[takeFromLocaleStorage.length - 1];
                        return searchingData;
                    });
            }
            return searchingData;
        };

        var _getResponsedDataByIndex = function (index) {
            var _data = {
                responsedData: {},
                pagingInformation: {}
            };
            var _responsedData1 = _responsedData();
                _responsedData1.then(function (response) {

                _data.responsedData = response.data.response.listings[index];
                _data.pagingInformation = takeFromLocaleStorage[takeFromLocaleStorage.length - 1];
                return _data;

                // } else {
                //     return _responsedData.then(function (responsedData) {
                //             return responsedData.responsedData[index];
                //         });
                //
                // }
                // ;

            })};


            return {
                dataResponse: _dataResponse,
                responsedData: _responsedData,
                getResponsedDataByIndex: _getResponsedDataByIndex
            }

        }
        ]);