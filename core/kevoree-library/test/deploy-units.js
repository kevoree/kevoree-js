// Created by leiko on 06/08/14 11:59
var kevoree = require('../kevoree-library').org.kevoree;

var factory = new kevoree.factory.DefaultKevoreeFactory();
var serializer = factory.createJSONSerializer();

var model = factory.createContainerRoot();

var du = factory.createDeployUnit();
du.name = 'kevoree-node-truc';
du.version = '0.9.0';
du.type = 'npm';

var tdef = factory.createNodeType();
tdef.name = 'KevoreeTruc';
tdef.version = '0.98.0';
tdef.deployUnit = du;

var node = factory.createContainerNode();
node.name = 'node0';
node.typeDefinition = tdef;

model.addTypeDefinitions(tdef);
model.addDeployUnits(du);
model.addNodes(node);

console.log(JSON.stringify(JSON.parse(serializer.serialize(model)), null, 4));

//var found = model.findDeployUnitsByID("groupName=,hashcode=,name=kevoree-node-truc,version=0.9.0");
//console.log(found);
