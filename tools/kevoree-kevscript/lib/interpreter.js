var kevoree = require('kevoree-library').org.kevoree,
    async   = require('async'),
    path    = require('path');

var factory = new kevoree.impl.DefaultKevoreeFactory();
var cloner  = new kevoree.cloner.DefaultModelCloner();

// retrieve statements processors
var statements = {
    addRepo:                require('./statements/addRepo'),
    include:                require('./statements/include'),
    add:                    require('./statements/add'),
    move:                   require('./statements/move'),
    attach:                 require('./statements/attach'),
    addBinding:             require('./statements/addBinding'),
    delBinding:             require('./statements/delBinding'),
    set:                    require('./statements/set'),
    network:                require('./statements/network'),
    remove:                 require('./statements/remove'),
    detach:                 require('./statements/detach'),
    typeDef:                require('./statements/typeDef'),
    nameList:               require('./statements/nameList'),
    instancePath:           require('./statements/instancePath'),
    namespace:              require('./statements/namespace'),
    wildcard:               require('./statements/wildcard'),
    string:                 require('./statements/string'),
    string2:                require('./statements/string2'),
    repoString:             require('./statements/repoString'),
    version:                require('./statements/version'),
    anything:               require('./statements/anything'),
    realString:             require('./statements/realString'),
    realStringNoNewLine:    require('./statements/realStringNoNewLine'),
    newLine:                require('./statements/newLine'),
    singleQuoteLine:        require('./statements/singleQuoteLine'),
    doubleQuoteLine:        require('./statements/doubleQuoteLine'),
    escaped:                require('./statements/escaped'),
    start:                  require('./statements/start'),
    stop:                   require('./statements/stop'),
    pause:                  require('./statements/pause')
};

/**
 *
 * @param ast
 * @param ctxModel
 * @param resolvers
 * @param callback
 */
var interpreter = function interpreter(ast, ctxModel, resolvers, callback) {
    // output model
    var model = null;
    // if we have a context model, clone it and use it has a base
    if (ctxModel) model = cloner.clone(ctxModel, false);
    // otherwise start from a brand new model
    else model = factory.createContainerRoot();

    var options = {
        resolvers: resolvers,
        namespaces: {}
    };

    // process statements
    var tasks = [];
    for (var i in ast.children) {
        for (var j in ast.children[i].children) {
            (function (stmt) {
                tasks.push(function (cb) {
                    statements[stmt.type](model, statements, stmt, options, cb);
                });
            })(ast.children[i].children[j]);
        }
    }

    // execute tasks
    async.series(tasks, function (err) {
        if (err) return callback(err);

        return callback(null, model);
    });
};

module.exports = interpreter;