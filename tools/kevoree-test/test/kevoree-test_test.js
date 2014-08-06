'use strict';

var ktest = require('../lib/kevoree-test.js');
var path = require('path');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.kevoreeTest = {
    setUp: function(done) {
        // setup here
        done();
    },
    bootstrap_node0: function (test) {
        test.expect(2);
        ktest.bootstrap('node0', 'sync', path.resolve('.', 'kevs', 'main.kevs'), function (err, model) {
            if (err) {
                throw err;
            }
            test.equal(model.findNodesByID('node0').name, 'node0');
            test.equal(model.findGroupsByID('sync').name, 'sync');
            test.done();
        });
    },
    bootstrap_node1: function (test) {
        test.expect(2);
        ktest.bootstrap('node1', 'sync', path.resolve('.', 'kevs', 'main.kevs'), function (err, model) {
            if (err) {
                throw err;
            }
            test.equal(model.findNodesByID('node1').name, 'node1');
            test.equal(model.findGroupsByID('sync').name, 'sync');
            test.done();
        });
    }
};
