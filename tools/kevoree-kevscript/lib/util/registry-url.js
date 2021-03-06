const TinyConf = require('tiny-conf');

module.exports = function registryUrl() {
	const ssl = TinyConf.get('registry.ssl');
	const port = TinyConf.get('registry.port');
	if (ssl) {
		if (port === 443) {
			return 'https://' + TinyConf.get('registry.host');
		} else {
			return 'https://' + TinyConf.get('registry.host') + ':' + port;
		}
	} else {
		if (port === 80) {
			return 'http://' + TinyConf.get('registry.host');
		} else {
			return 'http://' + TinyConf.get('registry.host') + ':' + port;
		}
	}
};
