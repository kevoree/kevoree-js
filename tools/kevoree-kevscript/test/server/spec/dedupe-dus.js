const assert = require('assert');
const readModel = require('../lib/readModel');
const dedupeDeployUnits = require('../../../lib/util/dedupe-deployunits');

const PATH = '/packages[kevoree]/typeDefinitions[name=Ticker,version=1]';

describe('KevScript - dedupe-deployunits', function mochaDescribe() {
	it('multiple DUs per platforms', () => {
		const model = readModel('resolver/multiple-platforms.json');
		const tdef = dedupeDeployUnits(model.findByPath(PATH));

		assert.equal(tdef.deployUnits.array.length, 2, 'tdef should have 2 dus (one for js, one for java)');
		assert.ok(tdef.findDeployUnitsByID('hashcode=def,name=kevoree-comp-ticker,version=0.800.43'), 'def:kevoree-comp-ticker:0.800.43 should be in tdef');
		assert.ok(tdef.findDeployUnitsByID('hashcode=ijk,name=org.kevoree.library.ticker,version=0.1.2'), 'ijk:org.kevoree.library.ticker:0.1.2 should be in tdef');
	});

	it('multiple DUs with same name & version', () => {
		const model = readModel('resolver/same-version.json');
		const tdef = dedupeDeployUnits(model.findByPath(PATH));

		assert.ok(tdef.findDeployUnitsByID('hashcode=abc,name=kevoree-comp-ticker,version=0.800.42'), 'abc:kevoree-comp-ticker:0.800.42 should be in tdef');
		assert.equal(tdef.findDeployUnitsByID('hashcode=def,name=kevoree-comp-ticker,version=0.800.42'), null, 'def:kevoree-comp-ticker:0.800.42 should be deleted');
	});

	it('multiple DUs with same name & version but different timestamps', () => {
		const model = readModel('resolver/same-version-timestamp.json');
		const tdef = dedupeDeployUnits(model.findByPath(PATH));

		assert.ok(tdef.findDeployUnitsByID('hashcode=abc,name=kevoree-comp-ticker,version=0.800.42'), 'abc:kevoree-comp-ticker:0.800.42 should be in tdef');
		assert.equal(tdef.findDeployUnitsByID('hashcode=def,name=kevoree-comp-ticker,version=0.800.42'), null, 'def:kevoree-comp-ticker:0.800.42 should be deleted');
	});
});
