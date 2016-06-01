'use strict';

angular.module('searchResults').component('searchResults', {
    templateUrl: 'search-results/search-results.template.html',
    controller: function SearchingController($http, $locale, dataServiceFactory) {
        var self = this;        
        self.data = dataServiceFactory.responsedData();
    }
});