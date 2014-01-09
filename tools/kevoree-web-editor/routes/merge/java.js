var java = require('java');
var getJSONModel = require('kevoree-model-sync').getJSONModel;
var config = require('../../config');
var kevoree = require('kevoree-library').org.kevoree;

java.classpath.push(config.KEV_JAR);

// Java tools
var resolver  = java.newInstanceSync('org.kevoree.resolver.MavenResolver'),
  jsonLoader  = java.newInstanceSync('org.kevoree.loader.JSONModelLoader'),
  list        = java.newInstanceSync('java.util.ArrayList'),
  serializer  = java.newInstanceSync('org.kevoree.serializer.JSONModelSerializer'),
  compare     = java.newInstanceSync('org.kevoree.compare.DefaultModelCompare'),
  factory     = java.newInstanceSync('org.kevoree.impl.DefaultKevoreeFactory');
list.addSync("http://oss.sonatype.org/content/groups/public");

// Javascript tools
var jsLoader = new kevoree.loader.JSONModelLoader();

module.exports = function (libraries, callback) {
  var mergedModel = factory.createContainerRootSync();
  for (var i in libraries) {
    var artID   = libraries[i].artifactID,
        grpID   = libraries[i].groupID,
        version = libraries[i].version;

    if (artID && grpID && version) {
      var file        = resolver.resolveSync(grpID, artID, version, 'jar', list);
      if (file == null) {
        console.error("Jar file for "+artID+" is null :/");

      } else {
        var jar      = java.newInstanceSync('java.util.jar.JarFile', file),
            jarEntry = jar.getJarEntrySync("KEV-INF/lib.json");

        if (jarEntry != null) {
          var model    = jsonLoader.loadModelFromStreamSync(jar.getInputStreamSync(jarEntry)).getSync(0),
              mergeSeq = compare.mergeSync(mergedModel, model);

          try {
            mergeSeq.applyOnSync(mergedModel);
          } catch (err) {
            console.error("mergeSeq.applyOn error");
            console.error(err);
            return callback(new Error("Something went wrong while merging model."));
          }

        } else {
          console.error("JarEntry KEV-INF/lib.kev for "+artID+" doesn't exist :/");
        }
      }

    } else {
      console.error('Malformed request. Library objects must have artifactID, groupID and version parameters');
    }
  }
  
  var strModel = serializer.serializeSync(mergedModel);        // converting 'Java' ContainerRoot to string
  mergedModel = jsLoader.loadModelFromString(strModel).get(0); // and then loading it with jsLoader
  return callback(null, mergedModel);                          // otherwise mergedModel wouldn't have been well typed
}