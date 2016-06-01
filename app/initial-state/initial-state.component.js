'use strict';

angular.module('initialState').component('initialState', {
    templateUrl: 'initial-state/initial-state.template.html',
    controller: function SearchingController($http) {
        var self = this;
        self.searchInput = 'leeds';
        self.goClickHandler = function (input) {
            $http.jsonp('http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&place_name=' +
                self.searchInput + '&callback=JSON_CALLBACK').then(function (response) {
                self.data = response.data.response.listings;
            });
            self.myLocationClickHandler = function () {

            };
            //.
            // then(function(response) {
            //    // self.phones = response.data;
            // });
        };

    }

});