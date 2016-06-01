var dataStoring = (function () {

    var _data = [];
    var self = this;

    function _addSearchingResult(value) {
        _data.push({
            id: getCurrentId(),
            searchingResult: value
        });

    }

    function _removeSearchingResult(id) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data.splice(index, 1);
            }
        })

    }

    function _updateSearchingResult(id, value) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data[index] = value;
            }
        })
        console.log('updated:', id);
        
    }

    function _save() {
        window.localStorage["tasks"] = JSON.stringify(_data, function (key, val) {
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

    return {
        data: _data,
        addSearchingResult: _addSearchingResult,
        updateSearchingResult: _updateSearchingResult,
        removeSearchingResult: _removeSearchingResult,
        save: _save,
        read: _read
    };

})();