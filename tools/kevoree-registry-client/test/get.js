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

    it('should retrieve JavaNode/5.0.2-SNAPSHOT model from registry', function (done) {
        var opts = { fqns: ['org.kevoree.library.java.JavaNode/5.0.2-SNAPSHOT'] };
        getModel(opts, function (err, modelStr) {
            expect(err).to.be.a('null');
            expect(modelStr).to.be.a('string');

            var loader  = factory.createJSONLoader();
            var model = loader.loadModelFromString(modelStr).get(0);
            var javaNode = model.findByPath('packages[org]/packages[kevoree]/packages[library]/packages[java]/typeDefinitions[name=JavaNode,version=5.0.2-SNAPSHOT]');
            expect(javaNode.name).to.equal('JavaNode');
            expect(javaNode.version).to.equal('5.0.2-SNAPSHOT');
            done();
        })
    });

    it('should retrieve a merge between WebEditor/5.0.1 & Ticker models from registry', function (done) {
        var opts = {
            fqns: [
                'packages[org]/packages[kevoree]/packages[library]/packages[java]/packages[toys]/typeDefinitions[name=Ticker]',
                'packages[org]/packages[kevoree]/packages[library]/packages[java]/packages[editor]/typeDefinitions[name=WebEditor,version=5.0.1]'
            ],
            kevPath: true
        };
        getModel(opts, function (err, modelStr) {
            expect(err).to.be.a('null');
            expect(modelStr).to.be.a('string');

            var loader  = factory.createJSONLoader();
            var model = loader.loadModelFromString(modelStr).get(0);
            var tickers = model.select('packages[org]/packages[kevoree]/packages[library]/packages[java]/packages[toys]/typeDefinitions[name=Ticker]').array;
            var webEditor = model.findByPath('packages[org]/packages[kevoree]/packages[library]/packages[java]/packages[editor]/typeDefinitions[name=WebEditor,version=5.0.1]');
            expect(tickers.length).to.be.at.least(1);
            expect(webEditor.name).to.equal('WebEditor');
            expect(webEditor.version).to.equal('5.0.1');
            done();
        })
    });
});