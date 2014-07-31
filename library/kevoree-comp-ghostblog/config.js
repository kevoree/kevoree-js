var path = require('path'),
	config;

config = {
    "development": {
        "url": "http://localhost:9090",
        "database": {
            "client": "sqlite3",
            "connection": {
                "filename": "/home/leiko/dev/kevoree-js/library/kevoree-comp-ghostblog/data/ghost.db"
            },
            "debug": false
        },
        "server": {
            "host": "127.0.0.1",
            "port": "9090"
        },
        "paths": {
            "contentPath": "/home/leiko/dev/kevoree-js/library/kevoree-comp-ghostblog/.deploy_units/node0/node_modules/kevoree-comp-ghostblog/node_modules/ghost/content/"
        }
    },
    "production": {
        "url": "http://my-ghost-blog.com",
        "mail": {},
        "database": {
            "client": "sqlite3",
            "connection": {
                "filename": "/home/leiko/dev/kevoree-js/library/kevoree-comp-ghostblog/.deploy_units/node0/node_modules/kevoree-comp-ghostblog/node_modules/ghost/content/data/ghost.db"
            },
            "debug": false
        },
        "server": {
            "host": "127.0.0.1",
            "port": "2368"
        }
    },
    "testing": {
        "url": "http://127.0.0.1:2369",
        "database": {
            "client": "sqlite3",
            "connection": {
                "filename": "/home/leiko/dev/kevoree-js/library/kevoree-comp-ghostblog/.deploy_units/node0/node_modules/kevoree-comp-ghostblog/node_modules/ghost/content/data/ghost-test.db"
            }
        },
        "server": {
            "host": "127.0.0.1",
            "port": "2369"
        },
        "logging": false
    },
    "travis-sqlite3": {
        "url": "http://127.0.0.1:2369",
        "database": {
            "client": "sqlite3",
            "connection": {
                "filename": "/home/leiko/dev/kevoree-js/library/kevoree-comp-ghostblog/.deploy_units/node0/node_modules/kevoree-comp-ghostblog/node_modules/ghost/content/data/ghost-travis.db"
            }
        },
        "server": {
            "host": "127.0.0.1",
            "port": "2369"
        },
        "logging": false
    },
    "travis-mysql": {
        "url": "http://127.0.0.1:2369",
        "database": {
            "client": "mysql",
            "connection": {
                "host": "127.0.0.1",
                "user": "travis",
                "password": "",
                "database": "ghost_travis",
                "charset": "utf8"
            }
        },
        "server": {
            "host": "127.0.0.1",
            "port": "2369"
        },
        "logging": false
    },
    "travis-pg": {
        "url": "http://127.0.0.1:2369",
        "database": {
            "client": "pg",
            "connection": {
                "host": "127.0.0.1",
                "user": "postgres",
                "password": "",
                "database": "ghost_travis",
                "charset": "utf8"
            }
        },
        "server": {
            "host": "127.0.0.1",
            "port": "2369"
        },
        "logging": false
    }
};

module.exports = config;