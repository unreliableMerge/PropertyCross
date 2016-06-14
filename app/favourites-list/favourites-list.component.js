'use strict';

angular.
    module('favouritesList').
    component('favouritesList', {
        templateUrl: 'favourites-list/favourites-list.template.html',
        controller: function FavouritesListCtrl() {
            var self = this;
            self.lastLocation = true;
            self.data = dataCoreStoringService.getFromStorageFavouritesItems();
        }
});