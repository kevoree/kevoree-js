// Created by leiko on 06/08/14 11:59
var expect = require('chai').expect;
var kevoree = require('../../kevoree-library');

var factory = new kevoree.factory.DefaultKevoreeFactory();

describe('DefaultKevoreeFactory: tests suite', function () {
    var model;
    it('should create an empty ContainerRoot', function () {
        model = factory.createContainerRoot();
        expect(model).to.be.an('object');
        expect(model.nodes.size()).to.equal(0);
        expect(model.groups.size()).to.equal(0);
        expect(model.hubs.size()).to.equal(0);
        expect(model.mBindings.size()).to.equal(0);
        expect(model.packages.size()).to.equal(0);
        expect(model.repositories.size()).to.equal(0);
    });

    it('should add a new package "org" to the model', function () {
        var pkg = factory.createPackage();
        pkg.name = 'org';
        model.addPackages(pkg);
        var thePkg = model.findByPath('packages['+pkg.name+']');

        expect(thePkg).to.be.an('object');
        expect(thePkg.name).to.equal(pkg.name);
    });

    it('should add a new sub package "kevoree" to the "org" package', function () {
        var pkg = factory.createPackage();
        pkg.name = 'kevoree';

        var orgPkg = model.findByPath('packages[org]');
        orgPkg.addPackages(pkg);
        var thePkg = model.findByPath('packages[org]/packages['+pkg.name+']');

        expect(thePkg).to.be.an('object');
        expect(thePkg.name).to.equal(pkg.name);
        expect(thePkg.eContainer().name).to.equal('org');
    });

    it('should add a new TypeDefinition "MyTDef" to package "org.kevoree"', function () {
        var tdef = factory.createTypeDefinition();
        tdef.name = 'MyTDef';
        tdef.version = '1.0.0';

        var orgKevoreePkg = model.findByPath('packages[org]/packages[kevoree]');
        orgKevoreePkg.addTypeDefinitions(tdef);
        var theTDef = model.findByPath('packages[org]/packages[kevoree]/typeDefinitions[name='+tdef.name+',version='+tdef.version+']');

        expect(theTDef).to.be.an('object');
        expect(theTDef.name).to.equal(tdef.name);
        expect(theTDef.version).to.equal(tdef.version);
        expect(theTDef.eContainer().name).to.equal('kevoree');
    });

    it('should add a new DictionaryType to "MyTDef"', function () {
        var dic = factory.createDictionaryType();
        var att = factory.createDictionaryAttribute();

        att.name = 'myAttr';
        att.defaultValue = 'foo';
        att.optional = false;
        att.fragmentDependant = true;
        att.datatype = kevoree.DataType.object.STRING;

        dic.addAttributes(att);
        var myTDef = model.findByPath('packages[org]/packages[kevoree]/typeDefinitions[name=MyTDef,version=1.0.0]');
        myTDef.dictionaryType = dic;

        expect(myTDef.dictionaryType).to.deep.equal(dic);
    });

    it('should add a new DeployUnit to "org.kevoree.MyTDef" TypeDefinition', function () {
        var du = factory.createDeployUnit();
        du.name = 'my-deploy-unit';
        du.version = '1.0.0';
        du.hashcode = 'fakeHashCode';

        var theTDef = model.findByPath('packages[org]/packages[kevoree]/typeDefinitions[name=MyTDef,version=1.0.0]');
        theTDef.addDeployUnits(du);
        var orgKevoreePkg = model.findByPath('packages[org]/packages[kevoree]');
        orgKevoreePkg.addDeployUnits(du);
        var theDU = model.findByPath('packages[org]/packages[kevoree]/deployUnits[hashcode='+du.hashcode+',name='+du.name+',version='+du.version+']');

        expect(theDU).to.be.an('object');
        expect(theDU.name).to.equal(du.name);
        expect(theDU.version).to.equal(du.version);
        expect(theDU.hashcode).to.equal(du.hashcode);
        expect(theDU.eContainer().name).to.equal('kevoree');
    });

    it('should add a new Repository "http://myrepo.org" to model', function () {
        var repo = factory.createRepository();
        var repoUrl = 'http://myrepo.org';
        repo.url = repoUrl;

        model.addRepositories(repo);
        var theRepo = model.repositories.get(0);

//        console.log(JSON.stringify(JSON.parse(serializer.serialize(model)), null, 4));

        expect(theRepo).to.be.an('object');
        expect(theRepo.url).to.equal(repoUrl);
    });

    it('should add a new NodeType to the model', function () {
        var nodeType = factory.createNodeType();
        nodeType.name = 'FooNode';
        nodeType.version = '0.42.0';

        var kevPkg = model.findByPath('packages[org]/packages[kevoree]');
        kevPkg.addTypeDefinitions(nodeType);

        var myNode = model.findByPath('packages[org]/packages[kevoree]/typeDefinitions[name='+nodeType.name+',version='+nodeType.version+']');
        expect(myNode.name).to.equal(nodeType.name);
        expect(myNode.version).to.equal(nodeType.version);
    });

    it('should add a new "FooNode" NodeType instance named "node0" to the model', function () {
        var node = factory.createContainerNode();
        node.name = 'node0';
        node.typeDefinition = model.findByPath('packages[org]/packages[kevoree]/typeDefinitions[name=FooNode,version=0.42.0]');
        node.dictionary = factory.createDictionary();
        node.started = true;

        model.addNodes(node);
        var myNode = model.findNodesByID(node.name);

        expect(myNode).to.be.an('object');
        expect(myNode.name).to.equal(node.name);
        expect(myNode.started).to.equal(node.started);
        expect(myNode.dictionary).to.be.an('object');
    });
});