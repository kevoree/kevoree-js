const chalk = require('chalk');
const kevoree = require('kevoree-library');
const kApi = require('kevoree-registry-client');
const diff = require('./diff');
const config = require('../../config');
const registryUrl = require('./registry-url');

function validateTdef(tdefModel) {
  tdefModel.removeAllDeployUnits();
  const namespace = tdefModel.eContainer().name;
  console.log('Looking for ' + chalk.bold(namespace + '.' + tdefModel.name + '/' + tdefModel.version) + ' in registry...');
  return kApi.tdef.getByNamespaceAndNameAndVersion(namespace, tdefModel.name, tdefModel.version)
    .then((tdef) => {
      console.log('Found ' + chalk.gray(registryUrl.tdef(config, tdef.id)));
      console.log();
      const factory = new kevoree.factory.DefaultKevoreeFactory();
      const loader = factory.createJSONLoader();
      const compare = factory.createModelCompare();
      const regTdef = loader.loadModelFromString(tdef.model).get(0);
      // create a ContainerRoot for registry tdef
      const regModel = factory.createContainerRoot().withGenerated_KMF_ID(0);
      factory.root(regModel);
      const regPkg = factory.createPackage().withName(tdef.namespace);
      regModel.addPackages(regPkg);
      regPkg.addTypeDefinitions(regTdef);
      // create a ContainerRoot for src tdef
      const srcModel = factory.createContainerRoot().withGenerated_KMF_ID(0);
      factory.root(srcModel);
      const srcPkg = factory.createPackage().withName(tdef.namespace);
      srcModel.addPackages(srcPkg);
      srcPkg.addTypeDefinitions(tdefModel);
      // diff the two models to ensure there are the same
      const traces = compare.diff(regModel, srcModel).traces.array;
      if (traces.length > 0) {
        // there is differences between local and registry: error
        diff(srcModel, regModel, traces);
        throw new Error('If you want to use your local changes then you have to increment your TypeDefinition version.');
      }

      return tdef;
    });
}

module.exports = validateTdef;
