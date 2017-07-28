var expect = require('chai').expect;
var kevoree = require('../../kevoree-library');

var NAME = 'myAttr';

describe('Dictionary Type: tests suite', function () {
	var factory = new kevoree.factory.DefaultKevoreeFactory();
	var dictionary = factory.createDictionaryType();

	it('should add a STRING attribute', function () {
		var attr = factory.createDictionaryAttribute();
		attr.name = NAME;
		attr.datatype = kevoree.DataType.object.STRING;
		dictionary.addAttributes(attr);
	});

	it('should serialize the dictionary to a string and then reload it', function () {
		//TODO
		//var dicStr = factory.createJSONSerializer().serialize(dictionary);
		//var reloadedDic = factory.createJSONLoader().loadModelFromString(dicStr).get(0);
		//var attr = reloadedDic.attributes.get(0);
		//expect(attr.name).to.equal(NAME);
		//if (!attr.datatype.equals_za3rmp$(kevoree.DataType.object.STRING)) {
		//	throw new Error('attr.datatype != DataType.object.STRING');
		//}
		////expect(attr.datatype).to.equal(kevoree.DataType.object.STRING);
		//console.log(attr.datatype);
	});
});