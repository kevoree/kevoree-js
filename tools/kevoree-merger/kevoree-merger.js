var kevoree = require('kevoree-library').org.kevoree,
  fs		= require('fs'),
  path	= require('path'),
  argv	= require('optimist')
    .usage('Usage: $0 --m0 path/to/a/model --m1 path/to/another/model')
    .demand(['m0', 'm1'])
    .argv;

var xmiLoader      = new kevoree.loader.XMIModelLoader();
var jsonLoader     = new kevoree.loader.JSONModelLoader();
var jsonSerializer = new kevoree.serializer.JSONModelSerializer();
var compare        = new kevoree.compare.DefaultModelCompare();

fs.readFile(argv.m0, {encoding: 'utf8'}, function (err, m0data) {
  if (err) throw err;

  var m0 = loadModel(m0data);
  if (m0 != null) {
    fs.readFile(argv.m1, {encoding: 'utf8'}, function (err, m1data) {
      if (err) throw err;

      var m1 = loadModel(m1data);
      if(m1 != null) {
        var seq = compare.merge(m0, m1);
        seq.applyOn(m0);

        var strModel = JSON.stringify(JSON.parse(jsonSerializer.serialize(m0)), null, 4);

        var filename = path.resolve(__dirname, 'merged.json');
        fs.writeFile(filename, strModel, function (err) {
          if (err) throw err;
          console.log('Models merged successfully into "'+filename+'"');
        });
      } else {
        console.error('Unable to load m1 model.');
        process.exit(1);
      }
    });
  } else {
    console.error('Unable to load m0 model.');
    process.exit(1);
  }
});

/**
 * Tries to load the model with the JSONLoader or the XMILoader
 * @param model a string model
 * @returns {ContainerRoot} or null if it fails
 */
var loadModel = function loadModel(model) {
  try {
    return jsonLoader.loadModelFromString(model).get(0);
  } catch (ignore) {
    try {
      return xmiLoader.loadModelFromString(model).get(0);
    } catch (ignore) {
      console.log(ignore.stack);
    }
  }

  return null;
}