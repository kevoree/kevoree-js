const path = require('path');
const assert = require('assert');
const kConst = require('kevoree-const');
const KevScript = require('kevoree-kevscript');
const loggerFactory = require('kevoree-logger');
const NPMResolver = require('kevoree-resolvers/lib/NPMResolver');
const config = require('tiny-conf');
const KevoreeCore = require('../../kevoree-core');
const readModel = require('./util/read-model');

describe('Kevoree Core', function kCoreTests() {
  this.timeout(10000);

  before('init', () => {
    loggerFactory.remove('console');

    config.set('registry', {
      host: 'registry.kevoree.org',
      port: 443,
      ssl: true
    });

    const npmResolver = new NPMResolver(
      path.join(kConst.GLOBAL_PATH, 'deploy_units'),
      loggerFactory.create('NPMResolver'));

    this.resolver = {
      resolve(du) {
        return npmResolver.resolve(du)
          .catch(() => {
            const duPath = path.join(kConst.GLOBAL_PATH, 'deploy_units', du.name, du.version, 'node_modules', du.name);
            delete require.cache[require.resolve(duPath)];
            return require(duPath);
          })
          .catch(() => {
            const duPath = path.join('..', 'fixtures', 'module', du.name);
            delete require.cache[require.resolve(duPath)];
            return require(duPath);
          });
      },
      uninstall() {
        return Promise.resolve();
      }
    };

    this.kevscript = new KevScript(loggerFactory.create('KevScript'));
  });

  beforeEach('initialize core', () => {
    this.core = new KevoreeCore(this.resolver, this.kevscript, loggerFactory);
    this.core.start('node0');
    assert.equal(this.core.nodeName, 'node0');
    const node = this.core.currentModel.findNodesByID('node0');
    assert.equal(node.name, 'node0');
    assert.equal(node.started, false);
  });

  it('should start node instance', () => {
    this.slow(200);
    const model = readModel('simple.json');
    return this.core.deploy(model)
      .then(() => {
        assert.ok(this.core.nodeInstance);
        assert.equal(this.core.nodeInstance.name, 'node0');
        assert.equal(this.core.nodeInstance.started, true);
      });
  });

  it('should stop when deploying unknown component on firstBoot', () => {
    this.slow(200);
    const model = readModel('unknown-comp.json');

    return this.core.deploy(model)
      .then(() => {
        throw new Error('Should have errored');
      }, (err) => {
        assert.equal(err.message, 'Something went wrong while executing adaptations');
      });
  });

  it('should stop when bootstrap failed on firstBoot', () => {
    this.slow(300);
    const model = readModel('unknown-du.json');
    return this.core.deploy(model)
      .then(() => {
        throw new Error('Should have errored');
      }, (err) => {
        assert.equal(err.message, 'Something went wrong while planning adaptations');
      });
  });

  it('should rollback when deploying erroneous component after firstBoot', () => {
    this.slow(400);
    const simpleModel = readModel('simple.json');
    const unknownCompModel = readModel('erroneous-comp.json');
    return this.core.deploy(simpleModel)
      .then(() => this.core.deploy(unknownCompModel))
      .then(() => {
        throw new Error('Should have errored');
      }, (err) => {
        assert.equal(err.message, 'Rollbacked to previous state');
        assert.equal(Object.keys(this.core.nodeInstance.adaptationEngine.modelObjMapper.map).length, 1);
      });
  });

  afterEach('stop core', () => {
    return this.core.stop();
  });
});
