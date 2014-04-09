var express = require('express'),
    routes  = require('./routes'),
    http    = require('http'),
    path    = require('path'),
    config  = require('./config');

var app = express();

// all environments
app.use(express.bodyParser()); // NB: it is IMPORTANT to call that before the rest
app.set('port', config.PORT);
app.set('jsonp callback', true);
app.use(config.ROUTE_PREFIX, app.router);

app.get('/load', routes.load);
app.post('/merge', routes.merge);
app.get('/merge', routes.merge);

app.use(function(req, res) {
  // if you end-up here, it means that I do not know the given url
  // so for now => redirect to '/' but you can put a custom 404 if you want
  res.send(404, 'Hum, this is not the page you are looking for');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server started on port ' + app.get('port'));
});