// Created by leiko on 06/08/14 11:59
var expect = require('chai').expect;
var kevoree = require('../../kevoree-library');

var factory = new kevoree.factory.DefaultKevoreeFactory();
var serializer = factory.createJSONSerializer();
var deserializer = factory.createJSONLoader();

var ORG_PKG     = 'org',
    KEV_PKG     = 'kev',
    TDEF        = 'MyTDef',
    DU          = 'my-deploy-unit',
    TDEF_VERS   = '1.0.0',
    DU_VERS     = '1.42.0',
    HASH        = 'fakeHashCode';

describe('Serializer/Deserializer: tests suite', function () {
    var model = createModel();
    var serializedModel;

    it('should serialize the model to a JSON string', function () {
        serializedModel = serializer.serialize(model);
        expect(serializedModel).to.be.a('string');
        expect(serializedModel.length).to.be.at.least(1);
    });

    it('should deserialize the model from a JSON string to a JS ContainerRoot Object', function () {
        var loadedModel = deserializer.loadModelFromString(serializedModel).get(0);

        var orgPkg = loadedModel.findByPath('packages['+ORG_PKG+']'),
            kevPkg = orgPkg.findPackagesByID(KEV_PKG),
            myTDef = kevPkg.findTypeDefinitionsByNameVersion(TDEF, TDEF_VERS),
            myDU   = myTDef.findDeployUnitsByHashcodeNameVersion(HASH, DU, DU_VERS);

        expect(orgPkg.name).to.equal(ORG_PKG);
        expect(kevPkg.name).to.equal(KEV_PKG);
        expect(myTDef.name).to.equal(TDEF);
        expect(myTDef.version).to.equal(TDEF_VERS);
        expect(myDU.name).to.equal(DU);
        expect(myDU.version).to.equal(DU_VERS);
        expect(myDU.hashcode).to.equal(HASH);
    });
});

function createModel() {
    // create model
    var model = factory.createContainerRoot();

    // create org package
    var orgPkg = factory.createPackage();
    orgPkg.name = ORG_PKG;
    model.addPackages(orgPkg);

    // create kevoree package
    var kevPkg = factory.createPackage();
    kevPkg.name = KEV_PKG;

    // add kevoree pkg to org pkg
    orgPkg.addPackages(kevPkg);

    // create MyTDef
    var myTDef = factory.createTypeDefinition();
    myTDef.name = TDEF;
    myTDef.version = TDEF_VERS;

    // add MyTDef to org.kevoree
    kevPkg.addTypeDefinitions(myTDef);

    // create a DictionaryType for MyTDef
    var dic = factory.createDictionaryType();

    // create a DictionaryAttribute for MyTDef DictionaryType
    var att = factory.createDictionaryAttribute();
    att.name = 'myAttr';
    att.defaultValue = 'foo';
    att.optional = false;
    att.fragmentDependant = true;
    att.datatype = kevoree.DataType.object.STRING;

    // add attribute to dictionary type
    dic.addAttributes(att);

    // add dictionary type to MyTDef
    myTDef.dictionaryType = dic;

    // create a DeployUnit
    var myDU = factory.createDeployUnit();
    var duName = DU;
    var duVers = DU_VERS;
    var duHashcode = HASH;
    myDU.name = duName;
    myDU.version = duVers;
    myDU.hashcode = duHashcode;

    // add DU to MyTDef
    myTDef.addDeployUnits(myDU);

    // add DU to org.kevoree package
    kevPkg.addDeployUnits(myDU);

    // create a Repository
    var repo = factory.createRepository();
    repo.url = 'http://myrepo.org';

    // add a repository
    model.addRepositories(repo);

    return model;
}