function registryUrl(config) {
  const host = config.get('registry.host');
  const port = config.get('registry.port');
  const ssl = config.get('registry.ssl');
  if (ssl) {
    if (port === 443) {
      return 'https://' + host;
    } else {
      return 'https://' + host + ':' + port;
    }
  } else {
    if (port === 80) {
      return 'http://' + host;
    } else {
      return 'http://' + host + ':' + port;
    }
  }
}

function tdefUrl(config, id) {
  return registryUrl(config) + '/#/tdefs/' + id;
}

function duUrl(config, id) {
  return registryUrl(config) + '/#/dus/' + id;
}

module.exports = registryUrl;
module.exports.tdef = tdefUrl;
module.exports.du = duUrl;
