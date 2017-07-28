// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// make sure config is the first thing set
const config = require('../config/index');

const chalk = require('chalk');
const kApi = require('kevoree-registry-client');
const kevoree = require('kevoree-library');
const paths = require('../config/paths');
const registryUrl = require('./util/registry-url');
const printHeader = require('./util/print-header');
const readFile = require('./util/read-file');
const validateTdef = require('./util/validate-tdef');
const validateDu = require('./util/validate-du');
const createTdef = require('./util/create-tdef');
const createDu = require('./util/create-du');

const appPkg = require(paths.appPackageJson);
const factory = new kevoree.factory.DefaultKevoreeFactory();
printHeader('Publishing Kevoree model', appPkg.name, appPkg.version);
console.log('Registry: ' + chalk.blue(registryUrl(config)));

kApi.account.get()
  .then((user) => {
    // user is logged-in
    console.log('Logged-in as: ' + chalk.cyan(user.login));
    console.log('Using namespace: ' + chalk.cyan(appPkg.kevoree.namespace) + '\n');
    // load model
    return readFile(paths.appModel)
      .then((jsonModel) => {
        const loader = factory.createJSONLoader();
        return loader.loadModelFromString(jsonModel).get(0);
      })
      .then((model) => {
        // validate tdef model
        const tdefModel = model.packages.array[0].typeDefinitions.array[0];
        return validateTdef(tdefModel)
          .catch((err) => {
            if (err.statusCode === 404) {
              // typeDef does not exist: create it
              console.log('Not found, creating...');
              return createTdef(tdefModel);
            } else {
              throw err;
            }
          })
          .then((tdef) => {
            // validate du model
            const duModel = model.packages.array[0].deployUnits.array[0];
            return validateDu(tdef, duModel)
              .then((du) => {
                // du already exist: update model if needed
                const prevHash = JSON.parse(du.model).hashcode;
                if (prevHash !== duModel.hashcode) {
                  const serializer = factory.createJSONSerializer();
                  du.model = serializer.serialize(duModel);
                  return kApi.du.update(du)
                    .then(() => {
                      console.log('Updated from ' + chalk.gray(prevHash) + ' to ' + chalk.magenta(duModel.hashcode));
                    });
                } else {
                  console.log('Same hashcode, no need to update.');
                }
              })
              .catch((err) => {
                if (err.statusCode === 404) {
                  // du does not exist: create it
                  console.log('Not found, creating...');
                  return createDu(tdef, duModel);
                } else {
                  throw err;
                }
              });
          });
      })
      .catch((err) => {
        console.log(chalk.red('Unable to publish'));
        console.log(err.stack);
        process.exit(1);
      });
  })
  .catch(() => {
    console.log(chalk.yellow('You need to login in order to publish model to a registry'));
    console.log('Use the CLI: ' + chalk.cyan('$ kevoree login'));
    process.exit(1);
  });
