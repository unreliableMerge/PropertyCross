'use strict';

angular.
    module('searchResults').
    component('searchResults', {
        templateUrl: 'search-results/search-results.template.html',
        controller: function SearchingCtrl(dataCoreService) {
            var self = this;
            self.data = dataCoreService.responsedData();
            self.lastLocation = true;
    
            if (self.data.responsedData == undefined) {
                dataCoreService.responsedData().then(function (responsedData) {
                    self.data = responsedData;
                    self.paginationButtonClickHandler(self.data.commonPageInformation.currentPage);
                });
            }
    
            self.paginationButtonClickHandler = function (pageNumber) {
                dataCoreService.dataResponse(self.data.commonPageInformation.requestName, pageNumber).then(function (responsedData) {
                        self.data = responsedData;
    
                        if (self.data.responsedData.length == 0) {
                            return self.noResult = true;
                        }
                    }
                )
            }
        }
});