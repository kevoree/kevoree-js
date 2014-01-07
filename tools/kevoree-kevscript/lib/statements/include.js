var kevoree = require('kevoree-library').org.kevoree;
var path = require('path');

var factory = new kevoree.impl.DefaultKevoreeFactory();
var compare = new kevoree.compare.DefaultModelCompare();

module.exports = function (model, statements, stmt, opts, cb) {
  if (!opts.resolvers) {
    // if "cb" is undefined, then  there is no "opts" parameter given, so no resolver, so :/
    return opts(new Error('You must give resolvers as options to "include.js" statement processor'));
  }

  if (!opts.resolvers) return cb(new Error('Unable to process include. No resolver given'));

  var du = factory.createDeployUnit();
  var type = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
  var mergeDef = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

  if (type == 'npm' && opts.resolvers.npm) {
    var colon = mergeDef.split(':');
    var arobas = mergeDef.split('@');
    if (colon.length == 1 && arobas.length == 1) {
      du.name = mergeDef;
    } else if (colon.length == 1 && arobas.length == 2) {
      du.name = arobas[0];
      du.version = arobas[1];
    } else if (colon.length == 2 && arobas.length == 1) {
      du.name = colon[0];
      du.version = colon[1];
    } else {
      return cb(new Error('Unable to parse include statement "'+mergeDef+'"'));
    }

    opts.resolvers.npm.resolve(du, function (err, Clazz, duModel) {
      if (err) return cb(err);

      var loader = new kevoree.loader.JSONModelLoader();
      var serializer = new kevoree.serializer.JSONModelSerializer();

      var tmp = loader.loadModelFromString(serializer.serialize(duModel)).get(0);
      var mergeSeq = compare.merge(model, tmp);
      mergeSeq.applyOn(model);
      return cb();
    });

  } else if (type == 'file' && opts.resolvers.file) {
    var pkg = require(path.resolve(mergeDef, 'package.json'));
    du.name = pkg.name;
    du.version = pkg.version;
    du.type = 'file';
    du.url = mergeDef;
    opts.resolvers.file.resolve(du, function (err, Clazz, duModel) {
      var loader = new kevoree.loader.JSONModelLoader();
      var serializer = new kevoree.serializer.JSONModelSerializer();

      var tmp = loader.loadModelFromString(serializer.serialize(duModel)).get(0);
      var mergeSeq = compare.merge(model, tmp);
      mergeSeq.applyOn(model);
      var dus = model.deployUnits.iterator();
      while (dus.hasNext()) {
        var deployUnit = dus.next();
        if (deployUnit.name == du.name) {
          deployUnit.type = 'file';
          deployUnit.url = mergeDef;
        }
      }
      return cb();
    });

  } else {
    // TODO handle mvn type and others
    console.log('Ignored: include '+type+':'+mergeDef+' (Unable to handle "'+type+'" include type yet. Sorry :/)');
    cb();
  }
}