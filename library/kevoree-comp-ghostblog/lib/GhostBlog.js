var AbstractComponent = require('kevoree-entities').AbstractComponent;

var ghost       = require('ghost'),
    errors      = require('../node_modules/ghost/core/server/errorHandling'),
    defaultConf = require('../node_modules/ghost/config.example'),
    extend      = require('./extend'),
    fs          = require('fs'),
    path        = require('path'),
    crypto      = require('crypto'),
    ncp         = require('ncp').ncp,
    rmdir       = require('rmdir'),
    mkdirp      = require('mkdirp'),
    os          = require('os');

var ENV     = 'development',
    URL     = 'http://YOUR-DOMAIN-NAME-HERE',
    HOST    = '127.0.0.1',
    PORT    = 2368;

/**
 * Kevoree component
 * @type {GhostBlog}
 */
var GhostBlog = AbstractComponent.extend({
    toString: 'GhostBlog',

    dic_root: { optional: false },
    dic_env:  { optional: true,  defaultValue: ENV  },
    dic_url:  { optional: false, defaultValue: URL  },
    dic_host: { optional: true,  defaultValue: HOST },
    dic_port: { optional: true,  defaultValue: PORT },

    /**
     * this method will be called by the Kevoree platform when your component has to start
     * @param done
     */
    start: function (done) {
        this._super(function () {
            var root = this.dictionary.getString('root');
            if (!root && root.length === 0) {
//            root = path.resolve(os.tmpdir(), 'blog_'+crypto.randomBytes(5).toString('hex'));
                done(new Error('You must define a root folder for your blog'));
                return;
            }
            root = path.resolve(root);
            var env = this.dictionary.getString('env', ENV);

            var defaultContent = path.resolve(__dirname, '..', 'node_modules', 'ghost', 'content'),
                blogContent = path.resolve(root, 'content'),
                blogConfPath = path.resolve(root, 'config.js');

            var myConfig = {};
            myConfig[env] = {
                url: this.dictionary.getString('url', URL),
                server: {
                    host: this.dictionary.getString('host', HOST),
                    port: this.dictionary.getNumber('port', PORT)
                },
                database: {
                    connection: {
                        filename: path.resolve(blogContent, 'data', 'ghost.db')
                    }
                },
                paths: null
            };

            var create = function () {
                mkdirp(root, function (err) {
                    if (err) { done(err); return; }

                    ncp(defaultContent, blogContent, function (err) {
                        if (err) { done(err); return; }

                        var blogConf = "var path = require('path'),\n\tconfig;\n\nconfig = " + JSON.stringify(extend(defaultConf, myConfig), null, 4) + ';\n\nmodule.exports = config;';
                        fs.writeFile(blogConfPath, blogConf, function (err) {
                            if (err) { done(err); return; }

                            process.env.NODE_ENV = env;
                            ghost({ config: blogConfPath }).then(function () {
//                            this.server = server;
                                this.log.info('Ghost blog root folder: ' + root);
                                done();
                            }.bind(this)).otherwise(function (err) {
                                errors.logErrorAndExit(err, err.context, err.help);
                            });
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this);

            fs.exists(root, function (exists) {
                if (exists) {
                    rmdir(root, function (err) {
                        if (err) { done(err); return; }

                        create();
                    });
                } else {
                    create();
                }
            });
        }.bind(this));
    },

    /**
     * this method will be called by the Kevoree platform when your component has to stop
     * @param done
     */
    stop: function (done) {
        this._super(function () {
            this.log.warn(this.toString(), 'stop(): not implemented yet');
            done();
        }.bind(this));
        // TODO
//        if (this.server) {
//            this.server.on('close', function () {
//                console.log('CLOSED §!!!!!!!');
//            });
//            this.server.close();
//        }
    }
});

module.exports = GhostBlog;
