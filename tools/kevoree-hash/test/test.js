var path = require('path');
var assert = require('assert');
var kHash = require('../kevoree-hash');

function assertHashesEquals(name) {
	var hash0 = kHash(path.resolve('test', 'fixtures', name, name));
	var hash1 = kHash(path.resolve('test', 'fixtures', name, 'npm-'+name));
	assert.equal(hash0, hash1);
}

describe('kHash()', function () {
	describe('compare local & npm-installed projects', function () {
		it('with no deps', function () {
			assertHashesEquals('simple');
		});

		it('with deps', function () {
			assertHashesEquals('deps');
		});

		it('with multiple deps', function () {
			// deps are not in same order in local and in npm-installed
			// to ensure that even in this case the hash is the same
			assertHashesEquals('multiple-deps');
		});

		it('with optDeps', function () {
			assertHashesEquals('opt-deps');
		});
	});
});
