// Created by leiko on 19/09/14 10:55
var registry = require('../index');
var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.factory.DefaultKevoreeFactory();
var loader = factory.createJSONLoader();

var options = {
    host: 'localhost',
    port: 8080,
    fqns: [
        'org.kevoree.library.java.editor.WebEditor/5.0.1',
        'org.kevoree.library.js.JavascriptNode/3.0.0-SNAPSHOT'
    ]
};

registry.get(options, function (err, model) {
    if (err) {
        console.log('BAOUM');
        throw err;
    } else {
        model = loader.loadModelFromString(model).get(0);
        var tdefs = model.select('**/typeDefinitions[name=*]');

        var webEditor = false;
        var jsNode = false;
        tdefs.array.forEach(function (tdef) {
            if (tdef.name === 'WebEditor' && tdef.version === '5.0.1') {
                webEditor = true;
            }

            if (tdef.name === 'JavascriptNode' && tdef.version === '3.0.0-SNAPSHOT') {
                jsNode = true;
            }
        });

        console.log('Result POST search valid ?', (webEditor && jsNode));
    }
});

options.fqns = ['packages[org]/packages[kevoree]/packages[library]/packages[java]/typeDefinitions[name=JavaNode]'];
options.kevPath = true;
registry.get(options, function (err, model) {
    if (err) {
        console.log('BAOUM');
        throw err;
    } else {
        model = loader.loadModelFromString(model).get(0);
        var tdefsSize = model.select('**/typeDefinitions[name=JavaNode]').size();

        console.log('Result GET from Kevoree path ?', (tdefsSize > 0));
    }
});


options.fqns = ['org.kevoree.library.java.editor.WebEditor/5.0.1'];
options.kevPath = false;
registry.get(options, function (err, model) {
    if (err) {
        console.log('BAOUM');
        throw err;
    } else {
        model = loader.loadModelFromString(model).get(0);
        var tdefsSize = model.select('**/typeDefinitions[name=WebEditor,version=5.0.1]').size();

        console.log('Result GET from FQN ?', (tdefsSize === 1));
    }
});