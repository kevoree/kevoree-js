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
    */
    start: function () {
        this._super();

        var root = this.dictionary.getString('root');
        if (!root && root.length === 0) {
//            root = path.resolve(os.tmpdir(), 'blog_'+crypto.randomBytes(5).toString('hex'));
            throw new Error('You must define a root folder for your blog');
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

        function create() {
            mkdirp(root, function (err) {
                if (err) throw err;

                ncp(defaultContent, blogContent, function (err) {
                    if (err) throw err;

                    var blogConf = "var path = require('path'),\n\tconfig;\n\nconfig = " + JSON.stringify(extend(defaultConf, myConfig), null, 4) + ';\n\nmodule.exports = config;';
                    fs.writeFile(blogConfPath, blogConf, function (err) {
                        if (err) throw err;

                        process.env.NODE_ENV = env;
                        ghost({ config: blogConfPath }).otherwise(function (err) {
                            errors.logErrorAndExit(err, err.context, err.help);
                        }).then(function () {
                            console.log('Ghost blog root folder: ' + root);
                        });
                    });
                });
            });
        }

        fs.exists(root, function (exists) {
            if (exists) {
                rmdir(root, function (err) {
                    if (err) throw err;

                    create();
                });
            } else {
                create();
            }
        });
    },

    /**
    * this method will be called by the Kevoree platform when your component has to stop
    */
    stop: function () {
        this._super();
        // TODO
        this.log.debug(this.toString(), 'STOP');
    }
});

module.exports = GhostBlog;
