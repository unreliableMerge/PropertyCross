'use strict';

angular.module('favouritesList').component('favouritesList', {
    templateUrl: 'favourites-list/favourites-list.template.html',
    controller: function FavouritesListController(dataServiceFactory) {
        var self = this;
        self.data = dataStoring.getFromStorageFavouritesItems();

    }
});