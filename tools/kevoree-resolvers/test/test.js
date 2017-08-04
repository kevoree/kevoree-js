const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const loggerFactory = require('kevoree-logger');
const NPMResolver = require('../lib/NPMResolver');
const kevoree = require('kevoree-library');
const factory = new kevoree.factory.DefaultKevoreeFactory();

describe('NPMResolver', function mochaDescribe() {
  this.timeout(20000);

  const modulesPath = path.resolve(process.cwd(), '.tmp');
  const logger = loggerFactory.create('Resolver', 'npm');
  let resolver;

  before('create modulesPath directory', (done) => {
    rimraf(modulesPath, () => {
      fs.mkdir(modulesPath, () => {
        resolver = new NPMResolver(modulesPath, logger, true);
        done();
      });
    });
  });

  it('should install kevoree-node-javascript:5.4.0-beta.1', () => {
    const du = factory.createDeployUnit();
    du.name = 'kevoree-node-javascript';
    du.version = '5.4.0-beta.1';
    return resolver.resolve(du);
  });

  it('should fail to install something-that-does-not-exist:1.2.3', () => {
    const du = factory.createDeployUnit();
    du.name = 'something-that-does-not-exist';
    du.version = '1.2.3';
    resolver.resolve(du)
      .then(() => {
        throw new Error('Should fail!');
      })
      .catch(() => {});
  });

  it('should fail to install kevoree-node-javascript:145215.1.2 (unknown version)', () => {
    const du = factory.createDeployUnit();
    du.name = 'kevoree-node-javascript';
    du.version = '145215.1.2';
    resolver.resolve(du)
      .then(() => {
        throw new Error('Should fail!');
      })
      .catch(() => {});
  });
});
