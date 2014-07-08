var Dictionary = require('../lib/Dictionary');
var Class = require('pseudoclass');

var FakeEntity = Class({
	toString: 'FakeEntity',

	dic_myAttr: {
		optional: true,
        defaultValue: 1000,
        datatype: 'number',
        update: function () {
        	console.log('update', arguments);
        }
	},

	isStarted: function () {
		return true;
	}
});

var d = new Dictionary(new FakeEntity());
console.log('=======');
console.log(d);
console.log('=======');
d.setEntry('myAttr', 9000);
d.setEntry('myAttr', 9001);
console.log('=======');
console.log(d);
console.log('=======');