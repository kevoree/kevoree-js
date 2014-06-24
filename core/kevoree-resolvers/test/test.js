/**
 * Created by leiko on 24/06/14.
 */
var os = require('os');
var NPMResolver = require('../lib/NPMResolver');
var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.impl.DefaultKevoreeFactory();
var du = factory.createDeployUnit();
du.name = 'kevoree-node-javascript';

describe('NPMResolver', function () {
    var resolver = new NPMResolver(os.tmpdir());

    describe('#resolve() kevoree-node-javascript:latest', function () {
        it('should install kevoree-node-javascript:latest', function (done) {
            du.version = 'latest';
            resolver.resolve(du, false, done);
        });

        it('should install kevoree-node-javascript:release', function (done) {
            du.version = 'release';
            resolver.resolve(du, false, done);
        });

        it('should install kevoree-node-javascript:0.6.0', function (done) {
            du.version = '0.6.0';
            resolver.resolve(du, false, done);
        });
    });
});