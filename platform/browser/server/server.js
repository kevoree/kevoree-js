var connect          = require('connect'),
    http             = require('http'),
    express          = require('express'),
    path             = require('path'),
    fs               = require('fs'),
    KevNodeJSRuntime = require('kevoree-nodejs-runtime'),
    routes           = require('./routes'),
    kevoree          = require('kevoree-library').org.kevoree,
    Kevscript        = require('kevoree-kevscript'),
    NPMResolver      = require('kevoree-resolvers').NPMResolver,
    config           = require('./config'),
    mustache         = require('mustache'),
    ClientCleaner    = require('./lib/client-cleaner');

var client_folder = path.join('..', 'client', 'dist');

var compare = new kevoree.compare.DefaultModelCompare();
var factory = new kevoree.impl.DefaultKevoreeFactory();
var loader  = new kevoree.loader.JSONModelLoader();
var model   = factory.createContainerRoot();

var firstDeploy = true;

var app = express();

app.use(connect.urlencoded());
app.use(connect.json());
app.set('views', client_folder);
app.set('port', config.port);

// rendering engine (basic html renderer)
app.engine('html', require('ejs').renderFile);

// start a kevoree nodejs platform server-side
var knjs = new KevNodeJSRuntime(config.paths.serverNodeDir);

knjs.on('started', function () {
    var kevs = new Kevscript({
        resolvers: {
            npm: new NPMResolver(config.paths.serverNodeDir, knjs.log)
        }
    });
    fs.readFile(path.resolve('server-model.kevs'), {encoding: 'utf8'}, function (err, data) {
        if (err) {
            console.error('Unable to read server-node Kevscript model file');
            console.error(err.stack);
            process.exit(1);
        }

        kevs.parse(mustache.render(data, config.serverPlatform), function (err, model) {
            if (err) {
                console.error('Unable to parse server-node Kevscript model');
                console.error(err.stack);
                process.exit(1);
            }

            knjs.deploy(model);
        });
    });
});

var clientCleaner;
knjs.on('deployed', function (deployedModel) {
    compare.merge(model, deployedModel).applyOn(model);
    if (firstDeploy) {
        firstDeploy = false;
        var server = http.createServer(app);
        server.listen(app.get('port'), function () {
            console.log('Kevoree Browser Runtime Server started on port '+app.get('port'));
        });
        clientCleaner = new ClientCleaner(server, model, knjs);
    } else {
        clientCleaner.setModel(model);
    }
});

knjs.on('error', function (err) {
    console.log("Kevoree NodeJS Runtime ERROR:", err.message);
});

knjs.start(config.serverPlatform.nodeName, config.serverPlatform.groupName);

app.use(express.static(client_folder));

app.get('/', routes.main);
app.post('/bootstrap', routes.bootstrap(model));
app.post('/resolve', routes.resolve);