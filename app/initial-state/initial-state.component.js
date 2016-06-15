'use strict';

angular.module('initialState').component('initialState', {
    templateUrl: 'initial-state/initial-state.template.html',
    controller: function InitialStateCtrl($http, $location, dataCoreService) {
        var self = this;
        self.marker;
        self.noResult = false;
        self.data = {
            responsedData: [],
            commonPageInformation: dataCoreStoringService.readInputRequest()
        };

        self.popUp = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    dataCoreService.getCountryByCoordinates(position.coords.latitude, position.coords.longitude).then(function (response) {
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

        self.closeModal= function (){
            self.openPopup = false;
            self.openMapPopup = false;
        };

        self.favesClickHandler = function () {
            $location.path('/favourites-list');
        };

        self.goClickHandler = function (input) {
            dataCoreService.dataResponse(input).then(function (responsedData) {
                self.data = responsedData;

                if (self.data.responsedData.length == 0) {
                    return self.noResult = true;
                }

                $location.path('/search-results');
            });
        };

        self.myLocationClickHandler = function () {
            self.openPopup = false;
            self.loader = true;
            self.deleteMarker();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    dataCoreService.getPlaceNameByCoordinates(position.coords.latitude, position.coords.longitude).then(function (response) {
                        self.data = response;

                        if (self.data == undefined || self.data.responsedData.length == 0) {
                            self.loader = false;
                            return self.noResult = true;
                        }

                        $location.path('/search-results');
                        self.loader = false;
                    });
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                handleLocationError(false, infoWindow, map.getCenter());
            }
            ;
        };

        self.openGBMapClickHandler = function () {
            self.openMapPopup = true;
            self.openPopup = false;

            self.map = new google.maps.Map(document.getElementById("googleMap"), {
                center: new google.maps.LatLng(54.463863, -3.228947),
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP,

            });
            self.deleteMarker();
            setTimeout(function () {
                google.maps.event.trigger(self.map, 'resize');
                self.map.setCenter(new google.maps.LatLng(54.463863, -3.228947));
            }, 100);
            google.maps.event.addListener(self.map, "click", function (e) {
                self.latitude = e.latLng.lat();
                self.longitude = e.latLng.lng();
                placeMarker(e.latLng);
            });
        };

        self.applyLocation = function () {
            self.openMapPopup = false;
            self.loader = true;
            dataCoreService.getPlaceNameByCoordinates(self.latitude, self.longitude).then(function (response) {
                self.data = response;

                if (self.data == undefined || self.data.responsedData.length == 0) {
                    self.loader = false;
                    return self.noResult = true;
                }

                $location.path('/search-results');
                self.loader = false;
            });
        };

        self.deleteMarker = function () {
            if (self.marker) {
                self.marker.setMap(null);
                self.marker = undefined;
            }
        };

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        };

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
        };
    }
});