var async = require('async');
var getJSONModel = require('kevoree-model-sync').getJSONModel;
var kevoree = require('kevoree-library').org.kevoree;

var serializer = new kevoree.serializer.JSONModelSerializer(),
    compare    = new kevoree.compare.DefaultModelCompare(),
    factory    = new kevoree.impl.DefaultKevoreeFactory();

module.exports = function (repos, libraries, callback) {
    var asyncTasks  = [];
    var mergedModel = factory.createContainerRoot();

    for (var i in libraries) {
        (function (lib) {
            asyncTasks.push(function (taskCb) {
                getJSONModel(lib.artifactID, lib.version, function (err, model) {
                    if (err) {
                        err.message = lib.artifactID+'@'+lib.version+' - '+err.message;
                        return taskCb(err);
                    }

                    // model retrieved successfully
                    // now merging it into mergedModel
                    compare.merge(mergedModel, model).applyOn(mergedModel);
                    taskCb();
                });
            });
        })(libraries[i]);
    }

    async.series(asyncTasks, function (err) {
        if (err) return callback(new Error('Something went wrong while merging models from Javascript libraries ('+err.message+')'));

        // all tasks have been executed successfully
        return callback(null, mergedModel);
    });
}