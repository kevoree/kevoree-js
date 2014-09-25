var AbstractComponent = require('kevoree-entities').AbstractComponent,
    DataType = require('kevoree-library').org.kevoree.DataType;

var FakeComp = AbstractComponent.extend({
    toString: 'FakeComp',

    dic_fooAttr:    { fragmentDependant: false, defaultValue: 'foo', datatype: 'boolean' },
    dic_emptyAttr:  { datatype: Number },
    dic_emptyAttr2: { datatype: String },
    dic_emptyAttr3: { datatype: Boolean },
    dic_emptyAttr4: { datatype: null },
    dic_port:       { defaultValue: 9000, fragmentDependant: true, datatype: DataType.object.DOUBLE },
    dic_port1:      { defaultValue: 52.2, datatype: DataType.object.FLOAT },
    dic_port2:      { defaultValue: "42", datatype: DataType.object.LONG },
    dic_port3:      { defaultValue: 1000},
    dic_boolAttr:   { optional: false, defaultValue: true },
    dic_image:          { },
    dic_commitTag:      { },
    dic_commitMsg:      { },
    dic_commitAuthor:   { },
    dic_cmd:            { },
    dic_authUsername:   { },
    dic_authPassword:   { },
    dic_authEmail:      { },
    dic_commitRepo:     { optional: false },
    dic_pushOnDestroy:  { defaultValue: false, datatype: 'boolean' },
    dic_pushRegistry:   { defaultValue: 'https://index.docker.io/v1/' },
    dic_cpuShares:      { optional: false, defaultValue: 0, datatype: 'number' },
    dic_memory:         { optional: false, defaultValue: 512, datatype: 'number' },

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
