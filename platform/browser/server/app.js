var express        = require('express'),
    path           = require('path'),
    routes         = require('./routes'),
    kevNodeJSPlat  = require('./lib/nodeJSPlatform'),
    connect        = require('connect');

var app = express();

app.use(express.static(path.join(__dirname, '..', 'client', 'dist', 'public')));
app.set('views', path.join(__dirname, '..', 'client', 'dist', 'public'));

app.use(express.bodyParser());

// rendering engine (basic html renderer)
app.engine('html', require('ejs').renderFile);

// start a kevoree nodejs platform server-side
kevNodeJSPlat(path.resolve(__dirname, '..'));

// server routes
app.get('/', routes.index);
app.post('/bootstrap', routes.bootstrap);
app.post('/resolve', routes.resolve);

module.exports = app;