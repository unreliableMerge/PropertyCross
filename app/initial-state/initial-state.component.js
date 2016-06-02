'use strict';

angular.module('initialState').component('initialState', {
    templateUrl: 'initial-state/initial-state.template.html',
    controller: function InitialStateController($http, $location, dataServiceFactory) {
        var self = this;

        self.searchInput = 'leeds';
        self.noResult = false;
        self.data = {
            responsedData: [],
            pagingInformation: dataStoring.readInputRequest()
        } 

        self.goClickHandler = function (input) {
            dataServiceFactory.dataResponse(input).then(function (responsedData) {
                self.data = responsedData;

                if (self.data.responsedData.length == 0) {
                    return self.noResult = true;
                }              
                
                $location.path('/search-results');
            });
        };

        self.myLocationClickHandler = function () {        };
    }
});