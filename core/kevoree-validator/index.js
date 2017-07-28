'use strict';

var kevoree = require('kevoree-library');
var ModelValidationError = require('./lib/ModelValidationError');

function testAttribute(instance, dictionary, attrType) {
  if (dictionary) {
    var attr = dictionary.findValuesByID(attrType.name);
    if (attr) {
      if (!attrType.optional) {
        if (!attr.value || attr.value.length === 0) {
          if (attrType.fragmentDependant) {
            throw new ModelValidationError('Missing value for non-optional fragmented attribute "'+attrType.name+'" in fragment "'+dictionary.name+'" for instance "' + instance.path() + '"', instance.path());
          } else {
            throw new ModelValidationError('Missing value for non-optional attribute "'+attrType.name+'" for instance "' + instance.path() + '"', instance.path());
          }
        }
      }
    } else {
      if (attrType.fragmentDependant) {
        throw new ModelValidationError('Missing fragmented attribute "'+attrType.name+'" in fragment "'+dictionary.name+'" for instance "' + instance.path() + '"', instance.path());
      } else {
        throw new ModelValidationError('Missing attribute "'+attrType.name+'" for instance "' + instance.path() + '"', instance.path());
      }
    }
  } else {
    throw new ModelValidationError('Missing dictionary for instance "' + instance.path() + '"', instance.path());
  }
}

function testPlatforms(tdef) {
  var platforms = [];
  tdef.deployUnits.array.forEach(function (du) {
    du.filters.array.forEach(function (filter) {
      if (filter.name === 'platform') {
        var idx = platforms.indexOf(filter.value);
        if (idx === -1) {
          platforms.push(filter.value);
        }
      }
    });
  });

  platforms.forEach(function (platform) {
    var metas = tdef.select('deployUnits[]/filters[name=platform,value='+platform+']').array;
    if (metas.length !== 1) {
      throw new ModelValidationError('TypeDefinition ' + tdef.name + '/' + tdef.version + ' has ' + metas.length + ' DeployUnits for the \''+platform+'\' platform (must be 1 per platform)', tdef.path());
    }
  });
}

module.exports = function (model) {
  var visitor = new kevoree.org.kevoree.modeling.api.util.ModelVisitor();
  visitor.visit = function (element/*, refInParent, parent*/) {
    switch (element.metaClassName()) {
      case 'org.kevoree.Dictionary':
      case 'org.kevoree.DictionaryType':
        // dictionary
        if (element.generated_KMF_ID !== '0.0' && element.generated_KMF_ID !== 0.0) {
          throw new ModelValidationError('Dictionary KMF_ID must be set to 0.0 to prevent diff errors in instance "' + element.eContainer().path() + '"', element.eContainer().path());
        }
        break;

      case 'org.kevoree.ContainerNode':
      case 'org.kevoree.Group':
      case 'org.kevoree.Channel':
      case 'org.kevoree.ComponentInstance':
        // instance
        if (!element.typeDefinition) {
          throw new ModelValidationError('No TypeDefinition defined for instance "' + element.path() + '"', element.path());
        }
        if (element.typeDefinition.dictionaryType) {
          element.typeDefinition.dictionaryType.attributes.array.forEach(function (type) {
            if (type.fragmentDependant) {
              element.fragmentDictionary.array.forEach(function (fDic) {
                testAttribute(element, fDic, type);
              });
            } else {
              testAttribute(element, element.dictionary, type);
            }
          });
        } else {
          if (element.dictionary) {
            throw new ModelValidationError('Instance "'+ element.path() +'" has a dictionary but it should not.', element.path());
          }
          if (element.fragmentDictionary.size() > 0) {
            throw new ModelValidationError('Instance "'+ element.path() +'" has fragment dictionaries but it should not.', element.path());
          }
        }
        break;

      case 'org.kevoree.NodeType':
      case 'org.kevoree.GroupType':
      case 'org.kevoree.ChannelType':
      case 'org.kevoree.ComponentType':
        // type definition
        if (element.deployUnits.size() === 0) {
          var metaData = element.findMetaDataByID('virtual');
          if (!metaData || metaData.value !== 'true') {
            throw new ModelValidationError('No DeployUnits defined for type "'+ element.path() +'"', element.path());
          }
        }
        testPlatforms(element);
        break;
    }
  };

  model.visit(visitor, true, true, true);
};

module.exports.ModelValidationError = ModelValidationError;
