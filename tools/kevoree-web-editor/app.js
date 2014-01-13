
/**
 * Module dependencies.
 */

var express = require('express'),
    routes  = require('./routes'),
    http    = require('http'),
    path    = require('path'),
    config  = require('./config');

var app = express();

// all environments
app.set('port', config.PORT);
app.set('jsonp callback', true);
app.use(config.ROUTE_PREFIX, app.router);
app.use(express.logger('dev'));
app.use(config.ROUTE_PREFIX, express.static(path.join(__dirname, config.CLIENT_PATH)));
app.set('views', path.join(__dirname, config.CLIENT_PATH));
// rendering engine (basic html renderer)
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('M7q,$wfz|UyloWSQy[2mTl0<X4iU}++x}]nW6ef)>lO7os,:wKZ0g>?f0YG)U0FQ'));
app.use(express.session());

// development only
app.configure('development', function() {
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/', routes.index);
app.get('/load', routes.load);
app.get('/merge', routes.merge);
app.get('/resolve', routes.resolve);

app.use(function(req, res) {
  // if you end-up here, it means that I do not know the given url
  // so for now => redirect to '/' but you can put a custom 404 if you want
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server started on port ' + app.get('port'));
});