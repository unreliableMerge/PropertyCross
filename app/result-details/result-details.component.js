'use strict';

angular.module('resultDetails').component('resultDetails', {
    templateUrl: 'result-details/result-details.template.html',
    controller: ['$routeParams', 'dataServiceFactory', function ResultDetailsController($routeParams, dataServiceFactory) {
        var self = this;

        self.data = dataServiceFactory.getResponsedDataByIndex($routeParams.index);

        if (self.data.responsedData == undefined) {
            dataServiceFactory.getResponsedDataByIndex($routeParams.index).then(function (responsedData) {
                self.data = responsedData;
            })
        }
    }]
});