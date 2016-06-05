'use strict';

angular.module('resultDetails').component('resultDetails', {
    templateUrl: 'result-details/result-details.template.html',
    controller: ['$route', 'dataServiceFactory', function ResultDetailsController($routeProvider, dataServiceFactory) {
        var self = this;

        $routeProvider.current.locals.prevRoutePromiseGetter().then(function (prevRoute) {
            prevRoute == 'favourities-list' ? self.lastLocation = true : self.lastLocation = false;

            if (self.lastLocation) {
                self.dataForView = dataStoring.getFromStorageFavouritesItems()[$routeProvider.current.params.index];
            }
            else {
                self.data = dataServiceFactory.getResponsedDataByIndex($routeProvider.current.params.index);
                if (self.data.responsedData != undefined){
                    self.dataForView = {
                        price: self.data.responsedData.price_formatted,
                        location: self.data.responsedData.title,
                        city: self.data.commonPageInformation.currentCity,
                        beds: self.data.responsedData.bedroom_number,
                        bathrooms: self.data.responsedData.bathroom_number,
                        summary: self.data.responsedData.summary,
                        img: self.data.responsedData.img_url
                    }
                }
                if (self.data.responsedData == undefined) {
                    dataServiceFactory.getResponsedDataByIndex($routeProvider.current.params.index).then(function (responsedData) {
                        self.data = responsedData;
                        if (self.data.responsedData != undefined){
                            self.dataForView = {
                                price: self.data.responsedData.price_formatted,
                                location: self.data.responsedData.title,
                                city: self.data.commonPageInformation.currentCity,
                                beds: self.data.responsedData.bedroom_number,
                                bathrooms: self.data.responsedData.bathroom_number,
                                summary: self.data.responsedData.summary,
                                img: self.data.responsedData.img_url
                            }
                        }
                    })
                }
            }

            self.addToFavouritesList = function () {
                dataStoring.addFavouritesItem(self.data.responsedData.price_formatted,
                    self.data.responsedData.title,
                    self.data.commonPageInformation.currentCity,
                    self.data.responsedData.bedroom_number,
                    self.data.responsedData.bathroom_number,
                    self.data.responsedData.summary,
                    self.data.responsedData.img_url)
            }
        });
    }]
});