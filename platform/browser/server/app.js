var express          = require('express'),
    path             = require('path'),
    KevNodeJSRuntime = require('kevoree-nodejs-runtime'),
    routes           = require('./routes'),
    connect          = require('connect'),
    kevoree          = require('kevoree-library').org.kevoree,
    config           = require('./config');

var compare    = new kevoree.compare.DefaultModelCompare();
var factory    = new kevoree.impl.DefaultKevoreeFactory();
var model      = factory.createContainerRoot();

var app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'dist', 'public')));
app.set('views', path.join(__dirname, '..', 'client', 'dist', 'public'));

app.use(express.bodyParser());

// rendering engine (basic html renderer)
app.engine('html', require('ejs').renderFile);

// start a kevoree nodejs platform server-side
var knjs = new KevNodeJSRuntime(path.resolve(__dirname, '..'));

knjs.on('started', function () {
  knjs.deploy();
});

knjs.on('deployed', function (deployedModel) {
  compare.merge(model, deployedModel).applyOn(model);
});

knjs.start(config.nodeJSPlatform.nodeName, config.nodeJSPlatform.groupName);

// server routes
app.get('/', routes.main);
app.post('/bootstrap', routes.bootstrap(model));
app.post('/resolve', routes.resolve);

module.exports = app;