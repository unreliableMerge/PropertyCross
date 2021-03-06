'use strict';

var dataCoreStoringService = (function () {

    var _favouritesItems = [];
    var _inputRequests = [];

    function _addFavouritesItem(data, advertisementId) {
        _favouritesItems.push({
            advertisementId: advertisementId,
            id: getCurrentFavouritesItemId(),
            price: data.price,
            location: data.location,
            city: data.city,
            beds: data.beds,
            bathrooms: data.bathrooms,
            summary: data.summary,
            img: data.img
        })
        _saveFavouritesItem.call(this);
    }

    function _deleteFavouritesItem(advertisementId) {
        _favouritesItems.forEach(function (e, index) {
            if (e.advertisementId == advertisementId) {
                _favouritesItems.splice(index, 1);
            }
        })
        _saveFavouritesItem.call(this);
    }

    function _updateFavouritesItem(id, value) {
        _favouritesItems.forEach(function (e, index) {
            if (e.id == id) {
                _favouritesItems[index] = value;
            }
        })
        _saveFavouritesItem.call(this);
    }

    function _saveFavouritesItem() {
        window.localStorage["favouritesItems"] = JSON.stringify(_favouritesItems, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val
        });
    }

    function _getFromStorageFavouritesItems() {
        var temp = window.localStorage["favouritesItems"]

        if (!temp) _favouritesItems = [];
        else {
            _favouritesItems = JSON.parse(temp);
        }
        return _favouritesItems;
    }

    function getCurrentFavouritesItemId() {
        if (!_favouritesItems || _favouritesItems.length == 0) return 0;
        else return _favouritesItems[_favouritesItems.length - 1].id + 1;
    }

    function _addInputRequest(requestName, currentPage, totalPages,
                              totalResults, currentCity, offset, resultsOnPage) {
        var nonExisted = true;

        _inputRequests.forEach(function (e, index) {
            if (e.requestName == requestName) {
                nonExisted = false;
                if (e.currentPage != currentPage) {
                    e.currentPage = currentPage;
                    _updateInputRequest(e.id, e);
                }
            }
        })

        if (nonExisted) {
            _inputRequests.push({
                id: getCurrentInputRequestId(),
                requestName: requestName,
                currentPage: currentPage,
                totalPages: totalPages,
                totalResults: totalResults,
                currentCity: currentCity,
                offset: parseInt(offset),
                resultsOnPage: parseInt(resultsOnPage)
            })
        }
        _saveInputRequest.call(this);
    }

    function _updateInputRequest(id, value) {
        _inputRequests.forEach(function (e, index) {
            if (e.id == id) {
                _inputRequests[index] = value;
            }
        })
        _saveInputRequest.call(this);
    }

    function _saveInputRequest() {
        window.localStorage["inputRequests"] = JSON.stringify(_inputRequests, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val
        });
    }

    function _readInputRequest() {
        var temp = window.localStorage["inputRequests"]

        if (!temp) _inputRequests = [];
        else {
            _inputRequests = JSON.parse(temp);
        }
        return _inputRequests;
    }

    function getCurrentInputRequestId() {
        if (!_inputRequests || _inputRequests.length == 0) return 0;
        else return _inputRequests[_inputRequests.length - 1].id + 1;
    }
    
    function _getAdvertisementId(id) {
        return id.match(/\d{25}/)[0];
    }

    return {
        favouritesItems: _favouritesItems,
        inputRequests: _inputRequests,
        addFavouritesItem: _addFavouritesItem,
        updateFavouritesItem: _updateFavouritesItem,
        deleteFavouritesItem: _deleteFavouritesItem,
        saveFavouritesItem: _saveFavouritesItem,
        getFromStorageFavouritesItems: _getFromStorageFavouritesItems,
        addInputRequest: _addInputRequest,
        updateInputRequest: _updateInputRequest,
        saveInputRequest: _saveInputRequest,
        readInputRequest: _readInputRequest,
        getAdvertisementId: _getAdvertisementId
    };
})();