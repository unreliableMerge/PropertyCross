'use strict';

angular.module('initialState').component('initialState', {
    templateUrl: 'initial-state/initial-state.template.html',
    controller: function InitialStateController($http, $location, dataServiceFactory) {
        var self = this;

        self.searchInput = 'leeds';
        self.noResult = false;
        self.data = {};

        self.goClickHandler = function (input) {

            dataServiceFactory.dataResponse(input).then(function (q) {
                self.data = q;

                if (self.data.length == 0) {
                    return self.noResult = true;
                }
                dataStoring.addSearchingResult(self.data);
                dataStoring.save();
                $location.path('/search-results');
            });
        };

        self.myLocationClickHandler = function () {

        };
    }
});