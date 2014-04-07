var Dictionary = require('../lib/Dictionary');

function FakeEntity() {
    var that = this;

    this.dic_myAttr = {
        optional: true,
            defaultValue: '1000',
            update: function (oldValue) {
            console.log('update', that.dic_myAttr.value, oldValue);
        }
    }
}

var d = new Dictionary(new FakeEntity());
console.log(d)
d.setEntry('myAttr', 9000);
d.setEntry('myAttr', 9001);