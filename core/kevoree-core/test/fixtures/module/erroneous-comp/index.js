var AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

var ErroneousComp = AbstractComponent.extend({
	toString: 'ErroneousComp',
	tdef_version: '0.0.0',

	start: function (done) {
		throw new Error('throw error on purpose !');
	}
});

module.exports = ErroneousComp;
