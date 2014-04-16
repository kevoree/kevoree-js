'use strict';

var grunt   = require('grunt'),
    kevoree = require('kevoree-library').org.kevoree;

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

exports.kevoree_genmodel = {
    setUp: function(done) {
        this.loader = new kevoree.loader.JSONModelLoader();
        done();
    },
    main: function(test) {
        test.expect(9);

        var genModelStr = grunt.file.read('test/fixtures/kevlib.json', {encoding: 'utf8'});
        var genModel = this.loader.loadModelFromString(genModelStr).get(0);
        var tdef = genModel.findTypeDefinitionsByID('FakeComp/0.0.42');
        var library = genModel.findLibrariesByID('Javascript');

        test.equal(genModel.typeDefinitions.size(), 1, 'Should be 1 and only one TypeDefinition generated');
        test.equal(tdef.name, 'FakeComp', 'TypeDefinition name should be FakeComp');
        test.equal(tdef.version, '0.0.42', 'TypeDefinition version should be 0.0.42');
        test.equal(tdef.dictionaryType.attributes.size(), 4, 'Should be 4 attributes defined');
        test.equal(tdef.provided.size(), 2, 'Should be 2 input ports defined');
        test.equal(tdef.required.size(), 1, 'Should be 1 output ports defined');
        test.equal(library.name, 'Javascript');
        test.equal(tdef.deployUnit.type, 'npm');
        test.equal(tdef.deployUnit.name, 'da-module-name');

        test.done();
    }
};
