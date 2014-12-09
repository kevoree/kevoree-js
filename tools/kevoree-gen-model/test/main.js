// Created by leiko on 27/08/14 13:38
var expect = require('chai').expect;
var path = require('path');

var modelGen = require('../kevoree-gen-model');

describe('kevoree-gen-model tests', function () {
    this.timeout(5000);

    it('generate examples/fakecomp model', function (done) {
        var modulePath = path.resolve(__dirname, '..', 'examples', 'fakecomp');
        modelGen(modulePath, true, function (err) {
            expect(err).to.be.a('undefined');
            done();
        });
    });

    it('generate examples/fakesubnode model', function (done) {
        var modulePath = path.resolve(__dirname, '..', 'examples', 'fakesubnode');
        modelGen(modulePath, true, function (err) {
            expect(err).to.be.a('undefined');
            done();
        });
    });
});
