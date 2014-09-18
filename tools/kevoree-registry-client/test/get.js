// Created by leiko on 09/09/14 16:03
var expect   = require('chai').expect;
var getModel = require('../index').get;
var kevoree  = require('kevoree-library').org.kevoree;

var factory = new kevoree.factory.DefaultKevoreeFactory();

describe('GET from Kevoree Registry', function () {
    this.timeout(5000);

    it('should retrieve JavaNode model from registry', function (done) {
        var opts = {
            fqns: ['org.kevoree.library.defaultNodeTypes.JavaNode'],
            type: 'json'
        };
        getModel(opts, function (err, modelStr) {
            expect(err).to.be.a('null');
            expect(modelStr).to.be.a('string');

            var loader  = factory.createJSONLoader();
            var model = loader.loadModelFromString(modelStr).get(0);
            var tdefs = model.select('packages[org]/packages[kevoree]/packages[library]/packages[defaultNodeTypes]/typeDefinitions[name=JavaNode]').iterator();
            while (tdefs.hasNext()) {
                var tdef = tdefs.next();
                expect(tdef.name).to.equal('JavaNode');
            }
            done();
        })
    });

    it('should retrieve JavaNode/5.0.1 model from registry', function (done) {
        var opts = { fqns: ['org.kevoree.library.defaultNodeTypes.JavaNode/5.0.1'] };
        getModel(opts, function (err, modelStr) {
            expect(err).to.be.a('null');
            expect(modelStr).to.be.a('string');

            var loader  = factory.createJSONLoader();
            var model = loader.loadModelFromString(modelStr).get(0);
            var tdefs = model.select('packages[org]/packages[kevoree]/packages[library]/packages[defaultNodeTypes]/typeDefinitions[name=JavaNode,version='+opts.version+']').iterator();
            while (tdefs.hasNext()) {
                var tdef = tdefs.next();
                expect(tdef.name).to.equal('JavaNode');
                expect(tdef.version).to.equal(opts.version);
            }
            done();
        })
    });

    it('should retrieve a merge between JavaNode/5.0.1 & WebEditor models from registry', function (done) {
        var opts = {
            fqns: [
                'packages[org]/packages[kevoree]/packages[library]/packages[defaultNodeTypes]/typeDefinitions[name=JavaNode,version=5.0.1]',
                '**/typeDefinitions[name=WebEditor]'
            ],
            kevPath: true
        };
        getModel(opts, function (err, modelStr) {
            expect(err).to.be.a('null');
            expect(modelStr).to.be.a('string');

            var loader  = factory.createJSONLoader();
            var model = loader.loadModelFromString(modelStr).get(0);
            var javaNode = model.findByPath('packages[org]/packages[kevoree]/packages[library]/packages[defaultNodeTypes]/typeDefinitions[name=JavaNode,version=5.0.1]');
            var webEditors = model.select('**/typeDefinitions[name=WebEditor]').array;
            expect(javaNode.name).to.equal('JavaNode');
            expect(javaNode.version).to.equal('5.0.1');
            expect(webEditors.length).to.be.at.least(1);
            expect(webEditors[0].name).to.equal('WebEditor');
            done();
        })
    });
});