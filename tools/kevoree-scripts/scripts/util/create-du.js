const chalk = require('chalk');
const kevoree = require('kevoree-library');
const kApi = require('kevoree-registry-client');

function createDu(tdef, duModel) {
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const serializer = factory.createJSONSerializer();
  const duJsonModel = serializer.serialize(duModel);

  return kApi.du.create(tdef.namespace, tdef.name, tdef.version, {
    name: duModel.name,
    version: duModel.version,
    platform: 'js',
    model: duJsonModel
  }).then((du) => {
    console.log(chalk.green('+') + ' ' + du.platform + ':' + du.name + ':' + du.version + ' ' + chalk.gray('(' + du.id + ')') + '\n');
  });
}

module.exports = createDu;
