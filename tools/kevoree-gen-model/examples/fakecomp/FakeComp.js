var AbstractComponent = require('kevoree-entities').AbstractComponent,
    DataType = require('kevoree-library').org.kevoree.DataType;

var FakeComp = AbstractComponent.extend({
    toString: 'FakeComp',

    dic_fooAttr:    { fragmentDependant: false, defaultValue: 'foo' },
    dic_emptyAttr:  { },
    dic_port:       { defaultValue: 9000, fragmentDependant: true, datatype: DataType.object.DOUBLE },
    dic_port1:      { defaultValue: 52.2, datatype: DataType.object.FLOAT },
    dic_port2:      { defaultValue: "42", datatype: DataType.object.LONG },
    dic_port3:      { defaultValue: 1000},
    dic_boolAttr:   { optional: false, defaultValue: true },

    start: function () {
        console.log("fake comp start");
    },

    stop: function () {
        console.log("fake comp stop");
    },

    out_potato: null,

    in_fake: function (msg) {},

    in_receiver: function (msg) {}
});

module.exports = FakeComp;
