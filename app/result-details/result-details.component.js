'use strict';

angular.module('resultDetails').component('resultDetails', {
    templateUrl: 'result-details/result-details.template.html',
    controller: ['$route', 'dataCoreService', function ResultDetailsController($routeProvider, dataCoreService) {
        var self = this;
        self.localKeeper = dataCoreStoringService.getFromStorageFavouritesItems();
        self.alreadyAdded = false;

        $routeProvider.current.locals.prevRoutePromiseGetter().then(function (prevRoute) {
            prevRoute == 'favourites-list' ? self.lastLocation = true : self.lastLocation = false;

            if (self.lastLocation) {
                self.dataForView = self.localKeeper[$routeProvider.current.params.index];
                self.alreadyAdded = true;
                self.checkSum = self.dataForView.checkSum;
            }
            else {
                self.data = dataCoreService.getResponsedDataByIndex($routeProvider.current.params.index);
                if (self.data.responsedData != undefined) {
                    self.dataForView = {
                        price: self.data.responsedData.price_formatted,
                        location: self.data.responsedData.title,
                        city: self.data.commonPageInformation.currentCity,
                        beds: self.data.responsedData.bedroom_number,
                        bathrooms: self.data.responsedData.bathroom_number,
                        summary: self.data.responsedData.summary,
                        img: self.data.responsedData.img_url
                    }
                    self.checkSum = toMd5(JSON.stringify(self.dataForView));
                    self.localKeeper.forEach(function (e) {
                        if (e.checkSum == self.checkSum) {
                            self.alreadyAdded = true;
                        }
                    })
                }
                if (self.data.responsedData == undefined) {
                    dataCoreService.getResponsedDataByIndex($routeProvider.current.params.index).then(function (responsedData) {
                        self.data = responsedData;
                        if (self.data.responsedData != undefined) {
                            self.dataForView = {
                                price: self.data.responsedData.price_formatted,
                                location: self.data.responsedData.title,
                                city: self.data.commonPageInformation.currentCity,
                                beds: self.data.responsedData.bedroom_number,
                                bathrooms: self.data.responsedData.bathroom_number,
                                summary: self.data.responsedData.summary,
                                img: self.data.responsedData.img_url
                            }
                            self.checkSum = toMd5(JSON.stringify(self.dataForView));
                            self.localKeeper.forEach(function (e) {
                                if (e.checkSum == self.checkSum) {
                                    self.alreadyAdded = true;
                                }
                            })
                        }
                    })
                }
            }
        });

        self.addToFavouritesList = function () {
            self.dataForView = {
                price: self.data.responsedData.price_formatted,
                location: self.data.responsedData.title,
                city: self.data.commonPageInformation.currentCity,
                beds: self.data.responsedData.bedroom_number,
                bathrooms: self.data.responsedData.bathroom_number,
                summary: self.data.responsedData.summary,
                img: self.data.responsedData.img_url
            }
            self.checkSum = toMd5(JSON.stringify(self.dataForView));
            dataCoreStoringService.addFavouritesItem(self.dataForView, self.checkSum);
            self.alreadyAdded = true;
        };

        self.deleteFromFavouritesList = function (checkSum) {
            dataCoreStoringService.deleteFavouritesItem(checkSum);
            self.alreadyAdded = false;
        }
    }]
});