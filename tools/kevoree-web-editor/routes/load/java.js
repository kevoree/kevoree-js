var parseString = require('xml2js').parseString;
var http = require('http');
var semver = require('semver');
var config = require('../../config');

var libraries = [];
var canClear = true;
var clearId = null;
var platform = 'java'; // enhance that to add "cloud", "android", etc...

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

module.exports = function (callback) {
  if (libraries.length > 0) {
    // return cached libraries
    return callback(null, libraries);
    
  } else {
    // load libraries from SONATYPE registry
    var options = {
      host: 'oss.sonatype.org',
      path: '/service/local/data_index?g=org.kevoree.library.'+platform
    }
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
            callback(new Error('Unable to parse XML file.'));
            canClear = true;
            return;
          }
          
          var artifacts = xml['search-results']['data'][0]['artifact'];
          for (var i in artifacts) {
            var rawArt = artifacts[i]['artifactId'][0].split('.');

            var grpId = artifacts[i]['groupId'][0],
              artId   = artifacts[i]['artifactId'][0],
              name    = rawArt[rawArt.length-1],
              version = artifacts[i]['version'][0];

            var versions = [];
            var latest = null;
            for (var j=0; j<artifacts.length-1; j++) {
              if (artifacts[j]['groupId'][0] === grpId && artifacts[j]['artifactId'][0] === artId) {
                versions.push(artifacts[j]['version'][0]);
                if (semver.gt(artifacts[j]['version'][0], artifacts[j+1]['version'][0])) {
                  latest = artifacts[j]['version'][0];
                } else {
                  latest = artifacts[j+1]['version'][0];
                }
              }
            }

            if (artifacts[i]['classifier'] == undefined) { // XXX Warning, this could be really bad
              libraries.push({
                groupID:    grpId,
                artifactID: artId,
                simpleName: name,
                latest:     latest,
                versions:   versions
              });
            }
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
}