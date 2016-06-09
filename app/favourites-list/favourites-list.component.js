'use strict';

angular.
    module('favouritesList').
    component('favouritesList', {
        templateUrl: 'favourites-list/favourites-list.template.html',
        controller: function FavouritesListController() {
            var self = this;
            self.data = dataCoreStoringService.getFromStorageFavouritesItems();
        }
});