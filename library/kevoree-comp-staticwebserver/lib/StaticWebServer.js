var AbstractComponent = require('kevoree-entities').AbstractComponent;

var path        = require('path');
var http        = require('http');
var finalHandler= require('finalhandler');
var serveStatic = require('serve-static');

var HOST    = '127.0.0.1',
    PORT    = 9090,
    ROOT    = path.join('path', 'to', 'a', 'folder');

/**
 * Kevoree component
 * @type {StaticWebServer}
 */
var StaticWebServer = AbstractComponent.extend({
    toString: 'StaticWebServer',

    /* This is an example of dictionary attribute that you can set for your entity */
    dic_host: {
      optional: false,
      defaultValue: HOST
    },

    dic_port: {
        optional: false,
        defaultValue: PORT
    },

    dic_root: {
        optional: true,
        defaultValue: ROOT
    },

    /**
    * this method will be called by the Kevoree platform when your component has to start
    */
    start: function () {
        this._super();

        var host = this.dictionary.getValue('host');
        if (!host || host.length === 0) {
            // default host for web server
            host = HOST;
        }

        var port = this.dictionary.getValue('port');
        if (!port || port.length === 0 || isNaN(parseInt(port))) {
            // default port
            port = PORT;
        }

        var root = this.dictionary.getValue('root');
        if (!root || root.length === 0) {
            // default root folder to statically serve
            root = ROOT;
        }

        var serve = serveStatic(root);
        this.server = http.createServer(function (req, res) {
            var done = finalHandler(req, res);
            serve(req, res, done);
        });
        this.server.listen(port, host, function () {
            this.log.info(this.toString(), 'Web Server started on port ' + port);
        }.bind(this));
    },

    /**
    * this method will be called by the Kevoree platform when your component has to stop
    */
    stop: function () {
        this._super();

        if (this.server) {
            this.server.close();
            this.log.info(this.toString(), 'Web Server closed.');
        }
    },

    update: function () {
        this.stop();
        this.start();
    }
});

module.exports = StaticWebServer;
