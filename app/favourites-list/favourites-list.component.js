'use strict';

angular.module('favouritesList').component('favouritesList', {
    templateUrl: 'favourites-list/favourites-list.template.html',
    controller: function FavouritesListController(dataServiceFactory) {
        var self = this;

        self.data = dataServiceFactory.responsedData();

        if (self.data.responsedData == undefined) {
            dataServiceFactory.responsedData().then(function (responsedData) {
                self.data = responsedData;
            });
        }
    }
});