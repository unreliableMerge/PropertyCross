'use strict';

angular.
    module('resultDetails').
    component('resultDetails', {
        templateUrl: 'common-partials/result-details/result-details.template.html',
        controller: ['$state', 'dataCoreService', function ResultDetailsCtrl($stateProvider, dataCoreService) {
            var self = this;
            self.localKeeper = dataCoreStoringService.getFromStorageFavouritesItems();
            self.alreadyAdded = false;

            $stateProvider.$current.locals.globals.PreviousState.Name == 'favouritesList' ? self.lastLocation = true : self.lastLocation = false;

            if (self.lastLocation) {
                self.dataForView = self.localKeeper[$stateProvider.params.index];
                self.alreadyAdded = true;
                self.advertisementId = self.dataForView.advertisementId;
            }
            else {
                self.data = dataCoreService.getResponsedDataByIndex($stateProvider.params.index);
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
                    self.advertisementId = dataCoreStoringService.getAdvertisementId(self.data.responsedData.lister_url);
                    self.localKeeper.forEach(function (e) {
                        if (e.advertisementId == self.advertisementId) {
                            self.alreadyAdded = true;
                        }
                    })
                }
                if (self.data.responsedData == undefined) {
                    dataCoreService.getResponsedDataByIndex($stateProvider.params.index).then(function (responsedData) {
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
                            self.advertisementId = dataCoreStoringService.getAdvertisementId(self.data.responsedData.lister_url);
                            self.localKeeper.forEach(function (e) {
                                if (e.advertisementId == self.advertisementId) {
                                    self.alreadyAdded = true;
                                }
                            })
                        }
                    })
                }
            }

            self.addToFavouritesList = function () {
                self.alreadyAdded = true;
                self.dataForView = {
                    price: self.data.responsedData.price_formatted,
                    location: self.data.responsedData.title,
                    city: self.data.commonPageInformation.currentCity,
                    beds: self.data.responsedData.bedroom_number,
                    bathrooms: self.data.responsedData.bathroom_number,
                    summary: self.data.responsedData.summary,
                    img: self.data.responsedData.img_url
                }
                self.advertisementId = dataCoreStoringService.getAdvertisementId(self.data.responsedData.lister_url);
                dataCoreStoringService.addFavouritesItem(self.dataForView, self.advertisementId);
            };

            self.deleteFromFavouritesList = function (advertisementId) {
                self.alreadyAdded = false;
                dataCoreStoringService.deleteFavouritesItem(advertisementId);

            }
        }]
});