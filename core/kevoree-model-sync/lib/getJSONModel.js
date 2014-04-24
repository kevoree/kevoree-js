var npmi     = require('npmi'),
    path    = require('path'),
    fs      = require('fs'),
    kevoree = require('kevoree-library').org.kevoree;

var loader = new kevoree.loader.JSONModelLoader();

/**
 *
 * @param unitName
 * @param version
 * @param callback
 */
module.exports = function (unitName, version, callback) {
    if (typeof(callback) == 'undefined') {
        callback = version;
        version = 'latest';
    }

    npmi({name: unitName, version: version}, function (err) {
        if (err) return callback(err);

        fs.readFile(path.resolve('node_modules', unitName, 'kevlib.json'), {encoding: 'utf-8'}, function (err, modelRawData) {
            if (err) return callback(err);
            
            try {
                var model = loader.loadModelFromString(modelRawData).get(0);
                return callback(null, model);
                
            } catch (err) {
                return callback(err);
            }
        });
    });
};