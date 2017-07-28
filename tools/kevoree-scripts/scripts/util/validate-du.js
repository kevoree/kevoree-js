const chalk = require('chalk');
const kApi = require('kevoree-registry-client');
const config = require('../../config');
const registryUrl = require('./registry-url');

function validateTdef(tdef, duModel) {
  const platform = duModel.findFiltersByID('platform').value;
  console.log('Looking for ' + chalk.bold(platform + ':' + duModel.name + ':' + duModel.version) + ' in registry...');
  return kApi.du.getByNamespaceAndTdefNameAndTdefVersionAndNameAndVersionAndPlatform(tdef.namespace, tdef.name, tdef.version, duModel.name, duModel.version, platform)
    .then((du) => {
      console.log('Found ' + chalk.gray(registryUrl.du(config, du.id)));
      return du;
    });
}

module.exports = validateTdef;
