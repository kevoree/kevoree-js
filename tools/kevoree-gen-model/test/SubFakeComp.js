var FakeComp = require('./FakeComp');

var SubFakeComp = FakeComp.extend({
    toString: "SubFakeComp",

    dic_potato: {
        defaultValue: "bar"
    }
});

module.exports = SubFakeComp;