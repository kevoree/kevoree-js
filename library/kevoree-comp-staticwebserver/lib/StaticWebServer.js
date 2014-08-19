var AbstractComponent = require('kevoree-entities').AbstractComponent;

var async       = require('async');
var path        = require('path');
var http        = require('http');
var fs          = require('fs');
var finalHandler= require('finalhandler');
var serveStatic = require('serve-static');

var HOST          = '127.0.0.1',
    PORT          = 9090,
    ROOT          = path.join('path', 'to', 'a', 'folder'),
    SHOW_DOTFILES = false,
    DOTFILES_403  = false,
    ETAG          = true,
    INDEX         = 'index.html',
    MAX_AGE       = '2h',
    REDIRECT      = true;

/**
 * Kevoree component
 * @type {StaticWebServer}
 */
var StaticWebServer = AbstractComponent.extend({
    toString: 'StaticWebServer',

    dic_host:            { defaultValue: HOST },
    dic_port:            { defaultValue: PORT },
    dic_root:            { defaultValue: ROOT },
    dic_index:           { defaultValue: INDEX },
    dic_maxAge:          { defaultValue: MAX_AGE },
    dic_redirect:        { defaultValue: REDIRECT },
    dic_showDotfiles:    { defaultValue: SHOW_DOTFILES },
    dic_dotfilesGive403: { defaultValue: DOTFILES_403 },
    dic_etag:            { defaultValue: ETAG },

    /**
     * this method will be called by the Kevoree platform when your component has to start
     * @param done
     */
    start: function (done) {
        this._super(function () {
            this.host = this.dictionary.getString('host', HOST);
            this.port = this.dictionary.getNumber('port', PORT);
            this.root = this.dictionary.getString('root', ROOT);

            fs.exists(this.root, function (exists) {
                if (!exists) {
                    done(new Error('StaticWebServer error: unable to find path "'+this.root+'"'));
                } else {
                    var dotfiles = 'ignore';
                    if (this.dictionary.getBoolean('dotfilesGive403', DOTFILES_403)) {
                        if (this.dictionary.getBoolean('showDotfiles', SHOW_DOTFILES)) {
                            dotfiles = 'allow';
                        }
                    } else {
                        dotfiles = 'deny';
                    }

                    var index = this.dictionary.getString('index', INDEX);
                    if (index === 'false') {
                        index = false;
                    }

                    var serve = serveStatic(this.root, {
                        dotfiles:   dotfiles,
                        etag:       this.dictionary.getBoolean('etag', ETAG),
                        index:      index,
                        maxAge:     this.dictionary.getString('maxAge', MAX_AGE),
                        redirect:   this.dictionary.getBoolean('redirect', REDIRECT)
                    });
                    this.server = http.createServer(function (req, res) {
                        var done = finalHandler(req, res);
                        serve(req, res, done);
                    });
                    this.server.listen(this.port, this.host, function () {
                        this.log.info(this.toString(), 'Web Server started ' + this.host + ':' + this.port + ' using folder ' + this.root);
                        done();
                    }.bind(this));

                    this.server.on('error', function (err) {
                        this.log.warn(this.toString(), this.getName()+' error: '+err.message);
                    });
                }
            }.bind(this));
        }.bind(this));
    },

    /**
     * this method will be called by the Kevoree platform when your component has to stop
     * @param done
     */
    stop: function (done) {
        this._super(function () {
            if (this.server) {
                (function (host, port, root) {
                    this.server.on('close', function () {
                        this.log.info(this.toString(), 'Web Server closed ' + host + ':' + port + ' using folder ' + root);
                        done();
                    }.bind(this));
                }.bind(this))(this.host, this.port, this.root);
                this.server.close();
            }
        }.bind(this));
    },

    update: function (done) {
        this._super(function () {
            async.series([
                function (cb) { this.stop(cb);  }.bind(this),
                function (cb) { this.start(cb); }.bind(this)
            ], done);
        }.bind(this));
    }
});

module.exports = StaticWebServer;
