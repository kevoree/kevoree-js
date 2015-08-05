#!/usr/bin/env node

var fs          = require('fs'),
    chalk       = require('chalk'),
    path        = require('path'),
    kevoree     = require('kevoree-library'),
    fakeKevoree = require('./lib/fake-kevoree');

var factory = new kevoree.factory.DefaultKevoreeFactory(),
    model   = factory.createContainerRoot(),
    pkgPath = path.resolve(process.cwd(), 'package.json'),
    pkg;

try {
  pkg = require(pkgPath);

} catch (err) {
  console.log(chalk.red('Error:') + ' unable to find ' + chalk.blue(pkgPath));
  process.exit(1);
}

// this will throw if package.json in invalid
checkValidity(pkg);

var typeClassPath = path.resolve(process.cwd(), pkg.main);
var typeClassInjector;

try {
  // package.json is valid
  console.log('Generating model...');
  // create Package
  var kPkg = factory.createPackage();
  kPkg.name = pkg.kevoree.namespace;
  // add Package to model
  model.addPackages(kPkg);
  // create DeployUnit
  var du = factory.createDeployUnit();
  du.name = pkg.name;
  du.version = pkg.version;
  // create a DeployUnit Filter
  var platform = factory.createValue();
  platform.name = 'platform';
  platform.value = 'javascript';
  // add Filter to DeployUnit
  du.addFilters(platform);
  // add DeployUnit to Package
  kPkg.addDeployUnits(du);
  typeClassInjector = require(typeClassPath);

} catch (err) {
  console.log(chalk.red('Error:') + ' unable to find ' + chalk.blue(path.resolve(process.cwd(), pkg.main)));
  process.exit(1);
}

try {
  typeClassInjector(fakeKevoree(model, pkg.kevoree.tdefVersion));

} catch (err) {
  console.log(err.stack);
  process.exit(1);
}

console.log('  Namespace       ' + chalk.cyan(model.packages.array[0].name));
console.log('  DeployUnit      ' + chalk.cyan(model.packages.array[0].deployUnits.array[0].name));
console.log('  Version         ' + chalk.cyan(model.packages.array[0].deployUnits.array[0].version));
console.log('  TypeDefinition  ' + chalk.cyan(model.packages.array[0].typeDefinitions.array[0].name));
console.log('  Version         ' + chalk.cyan(model.packages.array[0].typeDefinitions.array[0].version));

// beautify JSON hack
var modelStr = JSON.stringify(JSON.parse(factory.createJSONSerializer().serialize(model)), null, 2);
// write model to file
fs.writeFile(path.resolve(process.cwd(), 'model.json'), modelStr, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(chalk.green('Model "model.json" generated successfully'));
  }
});


function checkValidity(pkg) {
  var err = chalk.red('Error:') + ' malformed "package.json" (';

  if (!pkg.kevoree) {
    console.log(err + 'missing "kevoree" object)');
    process.exit(1);
  }

  if (!pkg.kevoree.namespace) {
    console.log(err + 'missing "kevoree.namespace" string)');
    process.exit(1);
  }

  if (!pkg.kevoree.tdefVersion) {
    console.log(err + 'missing "kevoree.tdefVersion" string)');
    process.exit(1);
  }
}
