'use strict';

angular.module('resultDetails').component('resultDetails', {
    templateUrl: 'result-details/result-details.template.html',
    controller: ['$routeParams', function ResultDetailsController($routeParams, dataServiceFactory) {
        var self = this;
        console.log($routeParams.index);
        //   self.data = dataServiceFactory.responsedData();
        //
        // if (self.data.length == 0 || self.data.length == undefined) {
        //     dataServiceFactory.responsedData().then(function (responsedData) {
        //         self.data = responsedData;
        //     });
        // }

    }]
});