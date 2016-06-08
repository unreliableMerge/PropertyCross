'use strict';

angular.module('searchResults').component('searchResults', {
    templateUrl: 'search-results/search-results.template.html',
    controller: function SearchingController(dataServiceFactory) {
        var self = this;
        self.data = dataServiceFactory.responsedData();

        if (self.data.responsedData == undefined) {
            dataServiceFactory.responsedData().then(function (responsedData) {
                self.data = responsedData;
                self.paginationButtonClickHandler(self.data.commonPageInformation.currentPage);
            });
        }

        self.paginationButtonClickHandler = function (pageNumber) {
            dataServiceFactory.dataResponse(self.data.commonPageInformation.requestName, pageNumber).then(function (responsedData) {
                    self.data = responsedData;

                    if (self.data.responsedData.length == 0) {
                        return self.noResult = true;
                    }
                }
            )
        }
    },
    resolve: {
        prevRoutePromiseGetter: function ($q, $rootScope) {
            var deferred = $q.defer();
            var dereg = $rootScope.$on('$routeChangeSuccess',
                function (evt, next, prev) {
                    dereg();
                    deferred.resolve((prev.originalPath || '').substr(1));
                }
            );
            return function () {
                return deferred.promise;
            };
        }
    }
});