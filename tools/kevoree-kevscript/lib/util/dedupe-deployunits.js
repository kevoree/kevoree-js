var semver = require('semver');
var modelHelper = require('./model-helper');

module.exports = function (tdef) {
	modelHelper.getPlatforms(tdef).forEach(function (platform) {
		var dus = tdef.select('deployUnits[]/filters[name=platform,value='+platform+']')
			.array.map(function (duPlatform) {
				// return the DeployUnit not the Filter
				return duPlatform.eContainer();
			});

		if (dus.length > 1) {
			// only keep the latest
			var latest = dus[0];
			for (var i=1; i<dus.length; i++) {
				if (semver.gt(latest.version, dus[i].version)) {
					dus[i].delete();
				} else if (semver.lt(latest.version, dus[i].version)) {
					latest.delete();
					latest = dus[i];
				} else {
					var timestamp0 = latest.findFiltersByID('timestamp');
					var timestamp1 = dus[i].findFiltersByID('timestamp');
					if (timestamp0 && timestamp1) {
						var t0 = parseInt(timestamp0.value, 10);
						var t1 = parseInt(timestamp1.value, 10);
						if (t0 > t1) {
							dus[i].delete();
						} else if (t0 < t1) {
							latest.delete();
							latest = dus[i];
						} else {
							if (latest.hashcode > dus[i].hashcode) {
								dus[i].delete();
							} else if (latest.hashcode < dus[i].hashcode) {
								latest.delete();
								latest = dus[i];
							} else {
								dus[i].delete();
							}
						}
					} else if (timestamp0 && !timestamp1) {
						dus[i].delete();
					} else {
						latest.delete();
						latest = dus[i];
					}
				}
			}
		}
	});

	return tdef;
};
