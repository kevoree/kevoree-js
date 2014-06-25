/**
 * Created by leiko on 24/06/14.
 */
var os = require('os');
var path = require('path');
var NPMResolver = require('../lib/NPMResolver');
var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.impl.DefaultKevoreeFactory();

describe('NPMResolver', function () {
    describe('#resolve()', function () {
        it('should install kevoree-node-javascript:latest', function (done) {
            var resolver = new NPMResolver(os.tmpdir());
            var du = factory.createDeployUnit();
            du.name = 'kevoree-node-javascript';
            du.version = 'latest';
            resolver.resolve(du, false, done);
        });

        it('should install kevoree-node-javascript:release', function (done) {
            var resolver = new NPMResolver(os.tmpdir());
            var du = factory.createDeployUnit();
            du.name = 'kevoree-node-javascript';
            du.version = 'release';
            resolver.resolve(du, false, done);
        });

        it('should install kevoree-node-javascript:0.6.0', function (done) {
            var resolver = new NPMResolver(os.tmpdir());
            var du = factory.createDeployUnit();
            du.name = 'kevoree-node-javascript';
            du.version = '0.6.0';
            resolver.resolve(du, false, done);
        });
    });
});