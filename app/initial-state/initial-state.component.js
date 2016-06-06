'use strict';

angular.module('initialState').component('initialState', {
    templateUrl: 'initial-state/initial-state.template.html',
    controller: function InitialStateController($http, $location, dataServiceFactory) {
        var self = this;

        self.searchInput = 'eastwood';
        self.noResult = false;
        self.data = {
            responsedData: [],
            commonPageInformation: dataStoring.readInputRequest()
        }

        self.favesClickHandler = function () {
            $location.path('/favourites-list');
        }

        self.goClickHandler = function (input) {
            dataServiceFactory.dataResponse(input).then(function (responsedData) {
                self.data = responsedData;

                if (self.data.responsedData.length == 0) {
                    return self.noResult = true;
                }

                $location.path('/search-results');
            });
        };

        self.myLocationClickHandler = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    dataServiceFactory.getPlaceNameByCoordinates(position.coords.latitude,position.coords.longitude);
                  //  infoWindow.setPosition(pos);
                   // infoWindow.setContent('Location found.');
                    //map.setCenter(pos);
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }


        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');


        };
    }
});