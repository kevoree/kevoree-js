var npm     = require('npm'),
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
        version = null;
    }
    try {
        // try to require.resolve model directly (this will work if the module has already been installed)
        require.resolve(unitName);
        var pkgJson = JSON.parse(fs.readFileSync(path.resolve('node_modules', unitName, 'package.json')));
        if (typeof(version) != 'undefined' && version != null && version.length > 0) {
            if (pkgJson.version === version) return model();
            else {
                var error = new Error('Version mismatch (wanted: '+version+', found: '+pkgJson.version+')');
                error.code = 'VERSION_MISMATCH';
                throw error;
            }
        } else {
            return model();
        }
        
    } catch (err) {
        if (err.code == 'MODULE_NOT_FOUND' || err.code == 'VERSION_MISMATCH') {
            // module wasn't installed locally : let's do it
            console.log("getJSONModel: Reinstalling library (reason: %s)", err.message);
            npm.load({}, function (err) {
                if (err) return callback(err);

                npm.commands.install([(version == null) ? unitName : unitName+'@'+version], function (err) {
                    if (err) return callback(err);

                    try {
                        return model();

                    } catch (err) {
                        return callback(err);
                    }
                })
            });
        } else {
            return callback(err);
        }
    }

    /**
     * Retrieves kevlib.json model, load it to a real ContainerRoot object
     * and call the callback method
     */
    function model() {
        var modelJson = require(path.resolve('node_modules', unitName, 'kevlib.json')),
            model = loader.loadModelFromString(JSON.stringify(modelJson)).get(0);
        callback(null, model);
    }
}