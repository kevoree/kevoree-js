var api = require('kevoree-registry-client');
var kevoree = require('kevoree-library');
// var semver = require('semver');
var registryUrl = require('../util/registry-url');
var KevScriptError = require('../KevScriptError');

module.exports = function registryResolverFactory(logger) {
  var factory = new kevoree.factory.DefaultKevoreeFactory();
  var loader = factory.createJSONLoader();

  function resolveTdef(fqn) {
    logger.debug('KevScript', 'RegistryResolver is looking for ' + fqn + ' in ' + registryUrl());
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
    return dus.find(function (du) {
      return du.platform === platform && du.version === version;
    });
  }

  return {
    resolve: function (fqn, model) {
      return resolveTdef(fqn)
        .then(function (regTdef) {
          fqn.version.tdef = regTdef.version;
          logger.info('KevScript', 'Found ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + ' in ' + registryUrl());
          var tdef = loader.loadModelFromString(regTdef.model).get(0);
          var pkg = model.findPackagesByID(fqn.namespace);
          if (!pkg) {
            pkg = factory.createPackage().withName(fqn.namespace);
            model.addPackages(pkg);
          }
          pkg.addTypeDefinitions(tdef);

          return resolveDus(fqn)
            .then(function (dus) {
              return {
                tdef: tdef,
                pkg: pkg,
                dus: dus
              };
            })
            .catch(function (err) {
              if (err.statusCode === 404) {
                throw new KevScriptError('Unable to find DeployUnits ' + fqn.version.du + ' for ' + fqn.namespace + '.' + fqn.namespace.name + '/' + fqn.version.tdef + 'in ' + registryUrl());
              } else {
                throw err;
              }
            });
        })
        .then(function (data) {
          if (typeof fqn.version.du === 'object') {
            // confirm that versions from registry satisfies version asked
            Object.keys(fqn.version.du).forEach(function (platform) {
              if (!satisfyingDu(data.dus, platform, fqn.version.du[platform])) {
                throw new KevScriptError('Unable to find satisfying DeployUnit ' +
                  ' { "' + platform + '": ' + '"' + fqn.version.du[platform] + '" } for ' +
                  fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + ' in ' + registryUrl());
              }
            });
          }
          // confirm that there are DeployUnits for that type
          if (data.dus.length === 0) {
            throw new KevScriptError('No DeployUnit found for ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + ' that matches ' + JSON.stringify(fqn.version.du));
          }
          // merge registry dus to current model package
          var pkg = model.findPackagesByID(fqn.namespace);
          data.dus.forEach(function (du) {
            var duModel = loader.loadModelFromString(du.model).get(0);
            pkg.addDeployUnits(duModel);
            var path = '/packages[' + fqn.namespace + ']/deployUnits[name=' + du.name + ',version=' + du.version + ']';
            model.select(path).array.forEach(function (duInModel) {
              logger.debug('KevScript', ' + ' + du.platform + ':' + du.name + ':' + du.version + ' (' + duInModel.hashcode + ')');
              data.tdef.addDeployUnits(duInModel);
            });
          });

          return model.findByPath('/packages[' + fqn.namespace + ']/typeDefinitions[name=' + fqn.name + ',version=' + fqn.version.tdef + ']');
        })
        .catch(function (err) {
          if (err.statusCode) {
            throw new KevScriptError('Unable to find ' + fqn.namespace + '.' + fqn.name + '/' + fqn.version.tdef + ' in ' + registryUrl());
          } else {
            throw err;
          }
        });
    }
  };
};
