// Created by leiko on 08/08/14 17:34
var kevoree = require('kevoree-library').org.kevoree;
var fs = require('fs');
var path = require('path');
var tmp = require('tmp');

/**
 *
 * @param {Object} model
 * @param {Function} callback function(Error, dirPath, modelPath)
 */
module.exports = function (model, callback) {
    tmp.dir({ mode: 0755, prefix: 'kevoree_', keep: true }, function (err, dirPath) {
        if (err) {
            callback(err);
        } else {
            tmp.file({ dir: dirPath, prefix: 'model_', postfix: '.json', keep: true }, function (err, modelPath) {
                if (err) {
                    callback(err);
                } else {
                    var factory = new kevoree.factory.DefaultKevoreeFactory();
                    var serializer = factory.createJSONSerializer();

                    try {
                        var modelData = serializer.serialize(model);
                        fs.writeFile(modelPath, modelData, function (err) {
                            callback(err, dirPath, modelPath);
                        });
                    } catch (err) {
                        callback(err);
                    }
                }
            });
        }
    });
};