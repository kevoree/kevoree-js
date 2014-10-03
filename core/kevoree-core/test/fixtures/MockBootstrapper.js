// Created by leiko on 03/10/14 14:53
var Bootstrapper = require('kevoree-commons').Bootstrapper;
var MockNode = require('./MockNode');

var MockBootstrapper = Bootstrapper.extend({
    toString: 'MockBootstrapper',

    bootstrap: function (du, force, done) {
        console.log('bootstrap(): nothing done');
        done(null, MockNode);
    },

    uninstall: function (du, done) {
        console.log('uninstall(): nothing done');
        done();
    }
});

module.exports = MockBootstrapper;