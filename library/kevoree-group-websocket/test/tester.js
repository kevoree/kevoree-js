/**
 * Created by leiko on 05/08/14.
 */
var test = require('./test');

var KTest = require('kevoree-test');
var path = require('path');

var options = {
    nodeName:  'node0',
    groupName: 'sync',
    kevscript: path.resolve(__dirname, '..', 'kevs', 'main.kevs')
};
var kevoree = new KTest(options);

kevoree
    .on('deployed', function (model) {

    })
    .on('error', function (err) {
        console.log('Pas cool: '+err.message);
        process.exit(0);
    });
