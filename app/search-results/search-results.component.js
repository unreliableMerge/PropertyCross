'use strict';

angular.module('searchResults').component('searchResults', {
    templateUrl: 'search-results/search-results.template.html',
    controller: function SearchingController($http, $locale, dataServiceFactory) {
        var self = this;

        self.data = dataServiceFactory.responsedData();

        if (self.data.responsedData == undefined) {
            dataServiceFactory.responsedData().then(function (responsedData) {
                self.data = responsedData;
            });
        }

        self.moreDetails = function (index) {
            console.log(index);
            $location.path('/search-results');
        }

    }
});