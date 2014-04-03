var FakeComp = require('./FakeComp');

var SubFakeComp = FakeComp.extend({
    toString: "SubFakeComp",

    dic_potato: {
        defaultValue: true
    }
});

module.exports = SubFakeComp;