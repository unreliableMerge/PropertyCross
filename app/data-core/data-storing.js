var dataStoring = (function () {

    var _data = [];

    function _addSearchingResult(value, recentSearchName) {
        var existence = true;

        _data.every(function (e, index) {
            if (e.recentSearchName == recentSearchName) {
                existence = false;
                return false;
            }
        })

        if (existence) {
            _data.push({
                id: getCurrentId(),
                recentSearchName: recentSearchName,
                searchingResult: value
            })
        }
        _save.call(this);
    }

    function _removeSearchingResult(id) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data.splice(index, 1);
            }
        })
        _save.call(this);
    }

    function _updateSearchingResult(id, value) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data[index] = value;
            }
        })
        _save.call(this);
    }

    function _save() {
        window.localStorage["searchingResults"] = JSON.stringify(_data, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val
        });
    }

    function dateStringToObject(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].duedate = new Date(data[i].duedate);
        }
        return data;
    }


    function _read() {
        var temp = window.localStorage["searchingResults"]

        if (!temp) _data = [];
        else {
            _data = JSON.parse(temp);
            dateStringToObject(_data);
        }
        return _data;
    }

    function getCurrentId() {
        if (!_data || _data.length == 0) return 0;
        else return _data[_data.length - 1].id + 1;
    }

    var _inputRequests = [];

    function _addInputRequest(value) {
        _inputRequests.push({
            id: getCurrentId(),
            requestName: value
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
            dateStringToObject(_inputRequests);
        }
        return _inputRequests;
    }

    return {
        data: _data,
        inputRequests: _inputRequests,
        addSearchingResult: _addSearchingResult,
        updateSearchingResult: _updateSearchingResult,
        removeSearchingResult: _removeSearchingResult,
        save: _save,
        read: _read,
        addInputRequest: _addInputRequest,
        saveInputRequest: _saveInputRequest,
        readInputRequest: _readInputRequest
    };

})();