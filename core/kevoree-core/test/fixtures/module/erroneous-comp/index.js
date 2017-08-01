const AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

const ErroneousComp = AbstractComponent.extend({
	toString: 'ErroneousComp',
	tdef_version: '0.0.0',

	start: function () {
		throw new Error('throw error on purpose !');
	}
});

module.exports = ErroneousComp;
