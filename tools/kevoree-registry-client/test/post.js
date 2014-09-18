// Created by leiko on 09/09/14 16:04
var expect   = require('chai').expect;
var getModel = require('../index').get;
var pushModel = require('../index').post;

describe('POST a model to Kevoree Registry', function () {
    this.timeout(5000);

    it('should post a model to registry', function (done) {
        getModel({fqns: ['org.kevoree.library.defaultNodeTypes.JavaNode/5.0.1']}, function (err, model) {
            expect(err).to.be.a('null');
            expect(model).to.be.a('string');

            pushModel({model: model}, function (err) {
                expect(err).to.be.a('null');
                done();
            });
        })
    });
});