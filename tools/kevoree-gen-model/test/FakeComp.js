var AbstractComponent = require('kevoree-entities').AbstractComponent;

var FakeComp = AbstractComponent.extend({
    toString: 'FakeComp',

    start: function () {
        console.log("fake comp start");
    },

    stop: function () {
        console.log("fake comp stop");
    },

    out_potato: null,

    in_fake: function (msg) {

    },

    in_receiver: function (msg) {

    },

    dic_fooAttr: {
        fragmentDependant: false,
        defaultValue: 'foo'
    },

    dic_emptyAttr: {},

    dic_port: {
        defaultValue: 9000,
        fragmentDependant: true
    },

    dic_boolAttr: {
        optional: false,
        defaultValue: true
    }
});

module.exports = FakeComp;
