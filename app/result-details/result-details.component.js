'use strict';

angular.module('resultDetails').component('resultDetails', {
    templateUrl: 'result-details/result-details.template.html',
    controller: ['$routeParams', 'dataServiceFactory', function ResultDetailsController($routeParams, dataServiceFactory) {
        var self = this;

        self.data = dataServiceFactory.getResponsedDataByIndex($routeParams.index);
    }]
});