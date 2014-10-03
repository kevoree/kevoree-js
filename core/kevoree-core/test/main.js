//// Created by leiko on 03/10/14 14:17
//var path = require('path');
//var fs = require('fs');
//
//var KevScript = require('kevoree-kevscript');
//var KevoreeLogger = require('kevoree-commons').KevoreeLogger;
//
//var Core = require('../kevoree-core');
//var MockBootstrapper = require('./fixtures/MockBootstrapper');
//
//// TESTS SUITE
//describe('KevoreeCore', function () {
//    this.timeout(10000);
//
//    var logger = new KevoreeLogger('KevoreeCore_Test');
//    logger.setLevel(KevoreeLogger.ALL);
//    var core = new Core('/tmp/kevoree_core_test', logger);
//    core.setBootstrapper(new MockBootstrapper());
//    core.on('error', errorHandler);
//    core.on('deployError', errorHandler);
//    core.on('rollbackError', errorHandler);
//    core.on('adaptationError', errorHandler);
//
//    it('should start a default runtime with node0', function (done) {
//        core.start('node0');
//        core.on('started', function (err) {
//            if (err) throw err;
//            done();
//        });
//    });
//
//    it('should deploy a default bootstrap model', function (done) {
//        var kevs = new KevScript();
//        var kevsModel = fs.readFileSync(path.resolve(__dirname, 'fixtures', 'main.kevs'), 'utf8');
//        kevs.parse(kevsModel, null, function (err, model) {
//            if (err) throw err;
//
//            core.deploy(model);
//            core.on('deployed', function (err) {
//                if (err) throw err;
//                core.stop();
//                core.on('stopped', function () {
//                    done();
//                });
//            });
//        });
//    });
//});
//
//function errorHandler(err) {
//    if (err) {
//        console.log('KevoreeCore Test Error');
//        throw err;
//    }
//}