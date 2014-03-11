var java = require('java');
var config = require('../../config');
var kevoree = require('kevoree-library').org.kevoree;

java.classpath.push(config.KEV_JAR);

var resolver   = java.newInstanceSync('org.kevoree.resolver.MavenResolver'),
    serializer = new kevoree.serializer.JSONModelSerializer(),
    loader     = new kevoree.loader.JSONModelLoader(),
    compare    = new kevoree.compare.DefaultModelCompare(),
    factory    = new kevoree.impl.DefaultKevoreeFactory();

module.exports = function (repos, libraries, callback) {
    var list = java.newInstanceSync('java.util.ArrayList');
//    list.addSync("http://oss.sonatype.org/content/groups/public");

    if (repos) for (var i in repos) list.addSync(repos[i]);

    console.log(list.toStringSync());

    var mergedModel = factory.createContainerRoot();
    for (var i in libraries) {
        var artID   = libraries[i].artifactID,
            grpID   = libraries[i].groupID,
            version = libraries[i].version;

        if (artID && grpID && version) {
            var file = resolver.resolveSync(grpID, artID, version, 'jar', list);
            if (file == null) {
                console.error("Jar file for "+artID+" is null :/");

            } else {
                var jar      = java.newInstanceSync('java.util.jar.JarFile', file),
                    jarEntry = jar.getJarEntrySync("KEV-INF/lib.json"),
                    strWriter = java.newInstanceSync('java.io.StringWriter');

                if (jarEntry != null) {
                    // filling up strWriter with jarEntry input stream content
                    java.callStaticMethodSync('org.apache.commons.io.IOUtils', 'copy', jar.getInputStreamSync(jarEntry), strWriter);
                    // load model from strWriter string
                    var model    = loader.loadModelFromString(strWriter.toStringSync()).get(0),
                        mergeSeq = compare.merge(mergedModel, model);

                    try {
                        mergeSeq.applyOn(mergedModel);
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

    return callback(null, mergedModel);
}