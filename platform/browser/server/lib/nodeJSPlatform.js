var KevNodeJSRuntime = require('kevoree-nodejs-runtime'),
  config             = require('./../config'),
  fs                 = require('fs'),
  path               = require('path'),
  kevoree            = require('kevoree-library').org.kevoree;

var serializer = new kevoree.serializer.JSONModelSerializer();
var serverSideModelPath = path.resolve(__dirname, '..', 'model.json');

module.exports = function (modulesPath) {
  var knjs = new KevNodeJSRuntime(modulesPath);

  knjs.on('started', function () {
    knjs.deploy();
  });

  knjs.on('deployed', function (model) {
    var serialized = serializer.serialize(model);
    fs.writeFile(serverSideModelPath, JSON.stringify(JSON.parse(serialized), null, 4), function (err) {
      if (err) {
        return console.error("Unable to write deployed model to server root :/ (tried path: %s)", serverSideModelPath);
      }

      console.log("New model deployed server-side : model.json (over)written at %s", serverSideModelPath);
    });
  });

  knjs.start(config.nodeJSPlatform.nodeName, config.nodeJSPlatform.groupName);
}