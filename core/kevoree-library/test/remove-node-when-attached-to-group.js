var kevoree = require('./../kevoree-library').org.kevoree;

var factory = new kevoree.factory.DefaultKevoreeFactory();
var serializer = factory.createJSONSerializer();

var model = factory.createContainerRoot();

var node = factory.createContainerNode();
node.name = "potato";

var group = factory.createGroup();
group.name = "daGroup";

model.addNodes(node);
model.addGroups(group);

group.addSubNodes(node);

group.removeSubNodes(node);
model.removeNodes(node);

console.log(JSON.stringify(JSON.parse(serializer.serialize(model)), null, 4));