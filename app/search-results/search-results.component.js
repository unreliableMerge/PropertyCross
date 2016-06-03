'use strict';

angular.module('searchResults').component('searchResults', {
    templateUrl: 'search-results/search-results.template.html',
    controller: function SearchingController(dataServiceFactory) {
        var self = this;

        self.data = dataServiceFactory.responsedData();

        if (self.data.responsedData == undefined) {
            dataServiceFactory.responsedData().then(function (responsedData) {
                self.data = responsedData;
            });
        }

        self.paginationButtonClickHandler = function (pageNumber) {
            dataServiceFactory.dataResponse(self.data.commonPageInformation.recentSearchName, pageNumber).then(function (responsedData) {
                    self.data = responsedData;

                    if (self.data.responsedData.length == 0) {
                        return self.noResult = true;
                    }
                }
            )
        }

    }
});