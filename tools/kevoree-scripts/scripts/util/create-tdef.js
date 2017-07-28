const chalk = require('chalk');
const kevoree = require('kevoree-library');
const kApi = require('kevoree-registry-client');

function createTdef(tdefModel) {
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const serializer = factory.createJSONSerializer();
  const tdefJsonModel = serializer.serialize(tdefModel);
  const namespace = tdefModel.eContainer().name;

  return kApi.tdef.create(namespace, {
    name: tdefModel.name,
    version: tdefModel.version,
    model: tdefJsonModel
  }).then((tdef) => {
    console.log(chalk.green('+') + ' ' + tdef.namespace + '.' + tdef.name + '/' + tdef.version + ' ' + chalk.gray('(' + tdef.id + ')') + '\n');
    return tdef;
  });
}

module.exports = createTdef;
