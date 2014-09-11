var AbstractNode = require('kevoree-entities').AbstractNode;

var FakeNode = AbstractNode.extend({
    toString: 'FakeNode',

    dic_fooAttr:    { fragmentDependant: false, defaultValue: 'foo' },
    dic_emptyAttr:  { },
    dic_port:       { defaultValue: 9000, fragmentDependant: true },
    dic_boolAttr:   { optional: false, defaultValue: true },

    start: function () {
        console.log("fake comp start");
    },

    stop: function () {
        console.log("fake comp stop");
    }
});

module.exports = FakeNode;
