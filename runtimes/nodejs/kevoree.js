var KevoreeCore = require('kevoree-core'),
    Bootstrapper = require('kevoree-commons').Bootstrapper,
    KevoreeLogger = require('kevoree-commons').KevoreeLogger,
    fs = require('fs'),
    kevoree = require('kevoree-library'),
    NPMResolver = require('kevoree-resolvers').NPMResolver;

var logger = new KevoreeLogger('runtime');
var core = new KevoreeCore('.deployUnits', logger);
var resolver = new NPMResolver('.deployUnits', logger);
var bootstrapper = new Bootstrapper(logger, resolver);
core.setBootstrapper(bootstrapper);
core.start('node0');

process.on('SIGINT', function() {
    process.stdout.write('\033[0G'); // http://stackoverflow.com/a/9628935/906441
    console.log('Got SIGINT. Shutting down kevoree...');
    core.stop();
});

var factory = new kevoree.factory.DefaultKevoreeFactory();
var loader = factory.createJSONLoader();
fs.readFile('./model.json', 'utf8', function (err, data) {
    if (err) {
        console.error('Unable to read model file');
        console.error(err.stack);
        core.stop();
    } else {
        try {
            var model = loader.loadModelFromString(data).get(0);
            core.deploy(model, function (err) {
                if (err) {
                    console.error(err.stack);
                    core.stop();
                } else {
                    console.log('bootstrap of node0: ok');
                }
            });
        } catch (err) {
            console.error('Unable to load model');
            console.error(err.stack);
            core.stop();
        }
    }
});
