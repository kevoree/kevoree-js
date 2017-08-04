const api = require('kevoree-registry-client');
const kevoree = require('kevoree-library');
// var semver = require('semver');
const registryUrl = require('../util/registry-url');
const KevScriptError = require('../KevScriptError');

module.exports = function registryResolverFactory(logger) {
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const loader = factory.createJSONLoader();

  function resolveTdef(fqn) {
    logger.debug('RegistryResolver is looking for ' + fqn + ' in ' + registryUrl());
    if (fqn.version.tdef === 'LATEST') {
      return api.tdef.getLatestByNamespaceAndName(fqn.namespace, fqn.name);
    } else {
      return api.tdef.getByNamespaceAndNameAndVersion(fqn.namespace, fqn.name, fqn.version.tdef);
    }
  }

  function resolveDus(fqn) {
    switch (fqn.version.du) {
      case 'LATEST':
        return api.du.getLatests(fqn.namespace, fqn.name, fqn.version.tdef);

      case 'RELEASE':
        return api.du.getReleases(fqn.namespace, fqn.name, fqn.version.tdef);

      default:
        return api.du.getSpecificByNamespaceAndTdefNameAndTdefVersion(fqn.namespace, fqn.name, fqn.version.tdef, fqn.version.du);
    }
  }

  function satisfyingDu(dus, platform, version) {
    return dus.find((du) => {
      return du.platform === platform && du.version === version;
    });
  }

  return {
    resolve: (fqn, model) => {
      return resolveTdef(fqn)
        .then((regTdef) => {
          fqn.version.tdef = regTdef.version;
          logger.info('Found ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + ' in ' + registryUrl());
          const tdef = loader.loadModelFromString(regTdef.model).get(0);
          let pkg = model.findPackagesByID(fqn.namespace);
          if (!pkg) {
            pkg = factory.createPackage().withName(fqn.namespace);
            model.addPackages(pkg);
          }
          pkg.addTypeDefinitions(tdef);

          return resolveDus(fqn)
            .then((dus) => {
              return {
                tdef: tdef,
                pkg: pkg,
                dus: dus
              };
            })
            .catch((err) => {
              if (err.statusCode === 404) {
                throw new KevScriptError('Unable to find DeployUnits ' + fqn.version.du + ' for ' + fqn.namespace + '.' + fqn.namespace.name + '/' + fqn.version.tdef + 'in ' + registryUrl());
              } else {
                throw err;
              }
            });
        })
        .then((data) => {
          if (typeof fqn.version.du === 'object') {
            // confirm that versions from registry satisfies version asked
            Object.keys(fqn.version.du).forEach((platform) => {
              if (!satisfyingDu(data.dus, platform, fqn.version.du[platform])) {
                throw new KevScriptError('Unable to find satisfying DeployUnit ' +
                  ' { "' + platform + '": "' + fqn.version.du[platform] + '" } for ' +
                  fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + ' in ' + registryUrl());
              }
            });
          }
          // confirm that there are DeployUnits for that type
          if (data.dus.length === 0) {
            throw new KevScriptError('No DeployUnit found for ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + ' that matches ' + JSON.stringify(fqn.version.du));
          }
          // merge registry dus to current model package
          const pkg = model.findPackagesByID(fqn.namespace);
          data.dus.forEach((du) => {
            const duModel = loader.loadModelFromString(du.model).get(0);
            pkg.addDeployUnits(duModel);
            const path = '/packages[' + fqn.namespace + ']/deployUnits[name=' + du.name + ',version=' + du.version + ']';
            model.select(path).array.forEach((duInModel) => {
              logger.debug(' + ' + du.platform + ':' + du.name + ':' + du.version + ' (' + duInModel.hashcode + ')');
              data.tdef.addDeployUnits(duInModel);
            });
          });

          return model.findByPath('/packages[' + fqn.namespace + ']/typeDefinitions[name=' + fqn.name + ',version=' + fqn.version.tdef + ']');
        })
        .catch((err) => {
          if (err.statusCode) {
            throw new KevScriptError('Unable to find ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + ' in ' + registryUrl());
          } else {
            throw err;
          }
        });
    }
  };
};
