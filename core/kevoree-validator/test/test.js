'use strict';

const kevoree = require('kevoree-library');
const expect = require('expect');

const modelValidator = require('..');

describe('modelValidator(...)', function () {
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const loader = factory.createJSONLoader();

  function doExpect(model) {
    return expect(function () {
      modelValidator(loader.loadModelFromString(model).get(0));
    });
  }

  context('must not throw when', function () {
    it('minimal model (no instance, no package, etc.)', function () {
      const model = JSON.stringify(require('../fixtures/valid/minimum.json'));
      doExpect(model).toNotThrow();
    });

    it('an empty value is set for an optional attribute', function () {
      const model = JSON.stringify(require('../fixtures/valid/empty-opt-attr.json'));
      doExpect(model).toNotThrow();
    });

    it('a typeDefinition does not have a dictionary type', function () {
      const model = JSON.stringify(require('../fixtures/valid/missing-dic-type.json'));
      doExpect(model).toNotThrow();
    });

    it('a virtual type has 0 deployUnit', function () {
      const model = JSON.stringify(require('../fixtures/valid/virtual-type.json'));
      doExpect(model).toNotThrow();
    });
  });

  context('must throw when', function () {
    it('an instance misses its typeDefinition', function () {
      const model = JSON.stringify(require('../fixtures/invalid/no-tdef.json'));
      doExpect(model).toThrow(/No TypeDefinition defined/);
    });

    it('a typeDefinition misses its deployUnits', function () {
      const model = JSON.stringify(require('../fixtures/invalid/no-du.json'));
      doExpect(model).toThrow(/No DeployUnits defined/);
    });

    it('an instance misses its dictionary', function () {
      const model = JSON.stringify(require('../fixtures/invalid/missing-dic.json'));
      doExpect(model).toThrow(/Missing dictionary/);
    });

    it('a dictionary type has a KMF_ID !== 0.0', function () {
      const model = JSON.stringify(require('../fixtures/invalid/wrong-dic-type-id.json'));
      doExpect(model).toThrow(/Dictionary KMF_ID must be set to 0.0/);
    });

    it('a dictionary has a KMF_ID !== 0.0', function () {
      const model = JSON.stringify(require('../fixtures/invalid/wrong-dic-id.json'));
      doExpect(model).toThrow(/Dictionary KMF_ID must be set to 0.0/);
    });

    it('an optional attribute is missing in dictionary', function () {
      const model = JSON.stringify(require('../fixtures/invalid/missing-opt-attr.json'));
      doExpect(model).toThrow(/Missing attribute/);
    });

    it('a non-optional attribute is missing in dictionary', function () {
      const model = JSON.stringify(require('../fixtures/invalid/missing-non-opt-attr.json'));
      doExpect(model).toThrow(/Missing attribute/);
    });

    it('a non-optional attribute has an empty value set', function () {
      const model = JSON.stringify(require('../fixtures/invalid/empty-non-opt-attr.json'));
      doExpect(model).toThrow(/Missing value/);
    });
  });
});
