var express          = require('express'),
    path             = require('path'),
    KevNodeJSRuntime = require('kevoree-nodejs-runtime'),
    routes           = require('./routes'),
    kevoree          = require('kevoree-library').org.kevoree,
    config           = require('./config');

require('./lib/client-cleaner');

var compare = new kevoree.compare.DefaultModelCompare();
var factory = new kevoree.impl.DefaultKevoreeFactory();
var model   = factory.createContainerRoot();

var firstDeploy = false;

var app = express();

app.use(express.bodyParser());
app.set('views', path.join(__dirname, '..', 'client', 'dist'));
app.set('port', 9040);

// rendering engine (basic html renderer)
app.engine('html', require('ejs').renderFile);



// start a kevoree nodejs platform server-side
var knjs = new KevNodeJSRuntime(config.paths.serverNodeDir);

knjs.on('started', function () {
    knjs.deploy();
});

knjs.on('deployed', function (deployedModel) {
    compare.merge(model, deployedModel).applyOn(model);
    if (!firstDeploy) {
        firstDeploy = true;
        app.listen(app.get('port'), function () {
            console.log('Kevoree Browser Runtime Server started on port '+app.get('port'));
        });
    }
});

knjs.on('error', function (err) {
   console.log("Kevoree NodeJS Runtime ERROR:", err.message);
});

knjs.start(config.nodeJSPlatform.nodeName, config.nodeJSPlatform.groupName);

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/', routes.main);
app.post('/bootstrap', routes.bootstrap(model));
app.post('/resolve', routes.resolve);