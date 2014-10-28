var path        = require('path'),
    kevoree     = require('kevoree-library').org.kevoree,
    KevScript   = require('kevoree-kevscript'),
    fs          = require('fs');

var factory = new kevoree.factory.DefaultKevoreeFactory();

/**
 * Generates a default model using lib/defaultModel.kevs.mustache
 * @param options
 * @param callback
 */
function defaultModel(options, callback) {
    var defaultModel = fs.readFile(path.resolve(__dirname, 'defaultModel.kevs.mustache'), 'utf8', function (err, data) {
        if (err) {
            callback(err);
        } else {
            data = data
                .replace(/{{nodeName}}/g, options.nodeName)
                .replace(/{{groupName}}/g, options.groupName)
                .replace(/{{groupPort}}/g, options.groupPort);
            options.logger.warn('No bootstrap model given, using:\n'+data);

            var kevs = new KevScript();
            kevs.parse(data, callback);
        }
    });
}

/**
 * Generates a node instance
 * @param options
 * @param callback
 */
function incompleteModel(options, callback) {

}

module.exports = function (options, callback) {
    if (options.model) {
        if (options.model.findNodesByID(options.nodeName)) {
            callback(null, options.model);
        } else {
            callback(new Error('Unable to find node instance "'+options.nodeName+'" in given model.'));
        }
    } else {
        defaultModel(options, callback);
    }
};