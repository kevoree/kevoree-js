var express        = require('express'),
    path           = require('path'),
    routes         = require('./routes'),
    clean          = require('./lib/cleanBrowserLibz'),
    kevNodeJSPlat  = require('./lib/nodeJSPlatform'),
    connect        = require('connect');

var app = express();

app.use(express.static('site/public'));
app.set('views', __dirname + '/site/views');

app.use(express.bodyParser());

// rendering engine (basic html renderer)
app.engine('html', require('ejs').renderFile);

// clean browserified libraries on server start-up
clean();

// start a kevoree nodejs platform server-side
kevNodeJSPlat(path.resolve(__dirname));

// server routes
app.get('/', routes.index);
app.post('/bootstrap', routes.bootstrap);
app.post('/resolve', routes.resolve);

module.exports = app;