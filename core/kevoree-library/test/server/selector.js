// Created by leiko on 15/09/14 12:15
var expect = require('chai').expect;
var kevoree = require('../../kevoree-library');

var factory = new kevoree.factory.DefaultKevoreeFactory();

var ORG_PKG     = 'org',
    KEV_PKG     = 'kev',
    TDEF        = 'MyTDef',
    DU          = 'my-deploy-unit',
    DU2         = 'my-deploy-unit2',
    TDEF_VERS   = '1.0.0',
    DU_VERS     = '1.42.0',
    DU2_VERS    = '4.0.0',
    HASH        = 'fakeHashCode',
    HASH2       = 'fakeHashCode2';

describe('KMF selectors: tests suite', function () {
    var model = createModel();

    it('should return an array of 2 DeployUnits using "model.select(\'**/deployUnits[name=*]\')"', function () {
        var res = model.select('**/deployUnits[name=*]');
        expect(res.size()).to.equal(2);
    });

    it('should get TypeDefinition org.kev.MyTDef using model.findByPath()', function () {
        var tdef = model.findByPath('packages[org]/packages[kev]/typeDefinitions[name='+TDEF+',version='+TDEF_VERS+']');
        expect(tdef.name).to.equal(TDEF);
        expect(tdef.version).to.equal(TDEF_VERS);
    });

    it('should return an array of 1 Package using "model.select(\'**/packages[name=bar]\')"', function () {
        var res = model.select('**/packages[name=bar]');
        expect(res.size()).to.equal(1);
    });

    it('should return an array of 2 Packages using "model.select(\'**/packages[name=*ar]\')"', function () {
        var res = model.select('**/packages[name=*ar]');
        expect(res.size()).to.equal(2);
    });

    // TODO add more tests
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

    var foobarPkg = factory.createPackage();
    foobarPkg.name = 'foobar';

    var barPkg = factory.createPackage();
    barPkg.name = 'bar';

    model.addPackages(foobarPkg);
    model.addPackages(barPkg);

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

    // create a second DeployUnit
    var myDU2 = factory.createDeployUnit();
    var du2Name = DU2;
    var du2Vers = DU2_VERS;
    var du2Hashcode = HASH2;
    myDU2.name = du2Name;
    myDU2.version = du2Vers;
    myDU2.hashcode = du2Hashcode;

    // add DU to org.kevoree package
    kevPkg.addDeployUnits(myDU2);

    // create a Repository
    var repo = factory.createRepository();
    repo.url = 'http://myrepo.org';

    // add a repository
    model.addRepositories(repo);

    var saver = factory.createJSONSerializer();
    require('fs').writeFileSync('/tmp/myModel.json', JSON.stringify(JSON.parse(saver.serialize(model)), null, 4), 'utf-8');

    return model;
}