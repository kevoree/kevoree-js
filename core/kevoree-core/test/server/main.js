const assert = require('assert');
const KevScript = require('kevoree-kevscript');
const loggerFactory = require('kevoree-logger');
const TinyConf = require('tiny-conf');
const KevoreeCore = require('../../kevoree-core');
const readModel = require('./util/read-model');

describe('Kevoree Core', function () {

  let core;

  before('init', function () {
    TinyConf.set('registry', {
      host: 'registry.kevoree.org',
      port: 443,
      ssl: true
    });
  });

  beforeEach('initialize core', function () {
    const resolver = {
      resolve: function (du, forceInstall, callback) {
        let error;
        let Type;
        try {
          Type = require(du.name);
        } catch (err) {
          error = err;
        }

        if (!error) {
          callback(null, Type);
        } else {
          // try locally (do get module from test folder)
          error = null;
          try {
            Type = require('../fixtures/module/' + du.name);
          } catch (err) {
            error = err;
          }

          if (!error) {
            callback(null, Type);
          } else {
            callback(error);
          }
        }
      },
      uninstall: function (du, callback) {
        callback();
      }
    };
    core = new KevoreeCore(resolver, new KevScript(loggerFactory.create('KevScript')), loggerFactory);
    core.start('node0');
    assert.equal(core.nodeName, 'node0');
    const node = core.currentModel.findNodesByID('node0');
    assert.equal(node.name, 'node0');
    assert.equal(node.started, false);
  });

  it('should start node instance', function () {
    this.slow(200);
    const model = readModel('simple.json');
    return core.deploy(model)
      .then(() => {
        assert.ok(core.nodeInstance);
        assert.equal(core.nodeInstance.name, 'node0');
        assert.equal(core.nodeInstance.started, true);
      });
  });

  it('should stop when deploying unknown component on firstBoot', function () {
    this.slow(200);
    const model = readModel('unknown-comp.json');
    return core.deploy(model)
      .then(() => {
        throw new Error('Should have errored');
      })
      .catch(() => {});
  });

  it('should stop when bootstrap failed on firstBoot', function () {
    this.slow(300);
    const model = readModel('unknown-du.json');
    return core.deploy(model)
      .then(() => {
        throw new Error('Should have errored');
      })
      .catch(() => {});
  });

  it('should rollback when deploying erroneous component after firstBoot', function () {
    this.slow(400);
    const simpleModel = readModel('simple.json');
    const unknownCompModel = readModel('erroneous-comp.json');
    return core.deploy(simpleModel)
      .then(() => {
        return new Promise((resolve) => {
          core.once('rollbackSucceed', () => {
            assert.equal(Object.keys(core.nodeInstance.adaptationEngine.modelObjMapper.map).length, 1);
            resolve();
          });
          core.deploy(unknownCompModel);
        });
      });
  });

  afterEach('stop core', function (done) {
    core.stop(done);
  });
});
