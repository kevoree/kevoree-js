var Class = require('pseudoclass');

var FileSystem = Class({
    toString: 'FileSystem',

    getFileSystem: function (size, callback) {
        if (document) {
            getBrowserFileSystem(this, size, callback);
        } else {
            console.error('Kevoree FileSystem API only handles Browser FS for now.');
        }
    }
});

var getBrowserFileSystem = function getBrowserFileSystem(fsapi, size, callback) {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    navigator.persistentStorage = navigator.persistentStorage || navigator.webkitPersistentStorage;

    if (window.requestFileSystem && navigator.persistentStorage) {

        var successHandler = function successHandler(grantedSize) {
            window.requestFileSystem(window.PERSISTENT, grantedSize, function (fs) {
                callback.call(fsapi, null, fs);
            });
        };

        var errorHandler = function errorHandler(e) {
            callback.call(fsapi, null);
        };

        navigator.persistentStorage.requestQuota(size, successHandler, errorHandler);
    }
};

module.exports = FileSystem;