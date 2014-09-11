var JavascriptNode = require('kevoree-node-javascript');

var FakeSubNode = JavascriptNode.extend({
    toString: 'FakeSubNode',

    dic_subAttr:    { defaultValue: 42, datatype: 'number' }
});

module.exports = FakeSubNode;
