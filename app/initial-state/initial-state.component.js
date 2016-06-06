'use strict';

angular.module('initialState').component('initialState', {
    templateUrl: 'initial-state/initial-state.template.html',
    controller: function InitialStateController($http, $location, dataServiceFactory) {
        var self = this;

        self.noResult = false;
        self.data = {
            responsedData: [],
            commonPageInformation: dataStoring.readInputRequest()
        };

        self.popUp = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    dataServiceFactory.getCountryByCoordinates(position.coords.latitude, position.coords.longitude).then(function (response) {
                        if (response != undefined) {
                            self.country = response;
                            if (self.country.short_name != 'GB') {
                                self.yourCountry = self.country.long_name;
                                self.openPopup = true;
                            }
                            else {
                                return self.myLocationClickHandler();
                            }
                        }
                    });
                });
            }
        };

        self.favesClickHandler = function () {
            $location.path('/favourites-list');
        };

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
            self.openPopup = false;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    dataServiceFactory.getPlaceNameByCoordinates(position.coords.latitude, position.coords.longitude).then(function (response) {
                        self.data = response;

                        if (self.data == undefined || self.data.responsedData.length == 0) {
                            return self.noResult = true;
                        }

                        $location.path('/search-results');
                    });
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                handleLocationError(false, infoWindow, map.getCenter());
            }
        };

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        };

        function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 6
            });
            var infoWindow = new google.maps.InfoWindow({map: map});

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    map.setCenter(pos);
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }

        self.openGBMapClickHandler = function () {
            self.openMapPopup = true;
        };
    }
});