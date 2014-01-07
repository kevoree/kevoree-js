var AbstractNode        = require('../kevoree-entities').AbstractNode,
    AbstractChannel     = require('../kevoree-entities').AbstractChannel,
    AbstractComponent   = require('../kevoree-entities').AbstractComponent,
    AbstractGroup       = require('../kevoree-entities').AbstractGroup;

var entities = [
    new AbstractNode(),
    new AbstractChannel(),
    new AbstractComponent(),
    new AbstractGroup()
];

for (var i in entities) {
    console.log('New entity: '+entities[i].toString());
    entities[i].start();
    entities[i].stop();
}

var dic = entities[0].getDictionary();
dic.on('add', function (name, value) {
    console.log("ADD %s:%s", name, value);
});
dic.on('update', function (name, oldValue, newValue) {
    console.log("UPDATE %s:[%s=>%s]", name, oldValue, newValue);
});

dic.setEntry('potato', 'foo');
dic.setEntry('bar', 9000);
dic.setEntry('bar', 42);
dic.setEntry('gta', 5);

console.log(JSON.stringify(entities[0].getDictionary().map, null, 2));

console.log("======================");

var newMap = {
    'gta': 5,
    'bar': 'baz',
    'snow': 'goons'
};

dic.setMap(newMap);
console.log(JSON.stringify(entities[0].getDictionary().map, null, 2));

console.log("======================");
console.log("======================");

console.log(JSON.stringify(entities[3].getDictionary().map, null, 2));