var parseString = require('xml2js').parseString;
var http = require('https');
var semver = require('semver');
var config = require('../../config');

module.exports = function (platform) {
    var libraries = [];
    var canClear = true;
    var clearId = null;

    // clear libraries cache function loop
    setInterval(function clearCache() {
        if (libraries.length > 0) {
            if (canClear) {
                clearTimeout(clearId);
                var currentdate = new Date();
                console.log(platform.charAt(0).toUpperCase() + platform.slice(1)+" core libraries cache cleared (" + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds()+')');
                libraries.length = 0;
            } else {
                clearTimeout(clearId);
                clearId = setTimeout(clearCache, 2000);
            }
        }
    }, config.CLEAR_LIBS); // do this every CLEAR_LIBS ms

    return function (callback) {
        if (libraries.length > 0) {
            // return cached libraries
            return callback(null, libraries);

        } else {
            // load libraries from SONATYPE registry
            var options = {
                host: 'oss.sonatype.org',
                path: '/service/local/data_index?g=org.kevoree.library.'+platform
            };
            var request = http.request(options, function (result) {
                var data = '';
                result.on('data', function (chunk) {
                    data += chunk;
                });
                result.on('end', function () {
                    // XML data fully retrieved from remote server => parsing and sending result
                    libraries.length = 0; // resetting library cache for this platform
                    canClear = false;
                    parseString(data, function (err, xml) {
                        if (err) {
                            console.error('ERROR: /load (platform: '+platform+')');
                            console.error('  > http://'+options.host+options.path);
                            console.error(err.stack);
                            callback(new Error('Server unable to parse XML file from Sonatype.'));
                            canClear = true;
                            return;
                        }

                        var artifacts = xml['search-results']['data'][0]['artifact'];
                        var libz = {};
                        for (var i in artifacts) {
                            if (artifacts[i]['classifier'] === undefined) {
                                var artId = artifacts[i]['artifactId'][0];
                                var rawArt = artId.split('.');

                                var lib = libz[artId];
                                if (!lib) {
                                    lib = {
                                        groupID:    artifacts[i]['groupId'][0],
                                        artifactID: artId,
                                        simpleName: rawArt[rawArt.length-1],
                                        versions:   []
                                    };
                                    libz[artId] = lib;
                                }
                                lib.versions.push(artifacts[i]['version'][0]);
                            }
                        }

                        for (var artId in libz) {
                            libz[artId].latest = libz[artId].versions[0];
                            for (var i=1; i < libz[artId].versions.length; i++) {
                                if (semver.gt(libz[artId].versions[i], libz[artId].latest)) {
                                    libz[artId].latest = libz[artId].versions[i];
                                }
                            }
                            libraries.push(libz[artId]);
                        }

                        callback(null, libraries);
                        canClear = true;
                        return;
                    });
                });
            });

            request.on('error', function (e) {
                // unable to reach oss.sonatype.org maven repository
                console.log('Unable to reach '+options.host+': ' + e.message+'. Loading '+platform+' core libraries failed.');
                // display error
                return callback(new Error('Unable to reach '+options.host));
            });

            request.end();
        }
    };
}