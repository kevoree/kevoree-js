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

    dic_attr0: {
        optional: false,
        fragmentDependant: true,
        defaultValue: "foo"
    },

    dic_attr1: null,

    dic_attr2: {
        optional: true
    }
});

module.exports = FakeComp;
