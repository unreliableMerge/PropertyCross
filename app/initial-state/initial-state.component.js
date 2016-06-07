'use strict';

angular.module('initialState').component('initialState', {
    templateUrl: 'initial-state/initial-state.template.html',
    controller: function InitialStateController($http, $location, dataServiceFactory) {
        var self = this;
        self.marker;
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

        self.openGBMapClickHandler = function () {
            self.openMapPopup = true;
            self.openPopup = false;
        };

        self.applyLocation = function () {
            self.openMapPopup = false;
            dataServiceFactory.getPlaceNameByCoordinates(self.latitude, self.longitude).then(function (response) {
                self.data = response;

                if (self.data == undefined || self.data.responsedData.length == 0) {
                    return self.noResult = true;
                }

                $location.path('/search-results');
            });
        };

        self.deleteMarker = function () {
            if (self.marker) {
                self.marker.setMap(null);
                self.marker = undefined;
            }
        };


        // map
        // properties
        // region

        var mapProperties = {
            center: new google.maps.LatLng(54.463863, -3.228947),
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP,

        };

        self.map = new google.maps.Map(document.getElementById("googleMap"), mapProperties);
        //google.maps.event.addListenerOnce(self.map, 'tilesloaded', function () {
        //    google.maps.event.addListenerOnce(self.map, 'tilesloaded', function () {
        //        google.maps.event.trigger(self.map, 'resize');
        //    });
        //});

        function placeMarker(location) {
            if (self.marker) {
                self.marker.setPosition(location);
            } else {
                self.marker = new google.maps.Marker({
                    position: location,
                    map: self.map,
                    draggable: true
                });
            }
        }


        google.maps.event.addListener(self.map, "click", function (e) {
            self.latitude = e.latLng.lat();
            self.longitude = e.latLng.lng();
            placeMarker(e.latLng);
        });
    }
});