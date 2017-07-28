'use strict';

var KevoreeEntity = require('kevoree-entities').KevoreeEntity;
var kevoree = require('kevoree-library').org.kevoree;

function inferType(type) {
  switch (type.toLowerCase()) {
    default:
      case 'string':
      return kevoree.DataType.object.STRING.name();

    case 'number':
        return kevoree.DataType.object.INT.name();

    case 'boolean':
        return kevoree.DataType.object.BOOLEAN.name();

    case 'float':
        return kevoree.DataType.object.FLOAT.name();

    case 'double':
        return kevoree.DataType.object.DOUBLE.name();

    case 'long':
        return kevoree.DataType.object.LONG.name();

    case 'short':
        return kevoree.DataType.object.SHORT.name();

    case 'byte':
        return kevoree.DataType.object.BYTE.name();

    case 'char':
        return kevoree.DataType.object.CHAR.name();
  }
}

/**
 * Generates dictionary and adds it to given typeDef
 * @param typeDef
 * @param Class
 * @returns {DictionaryType}
 */
module.exports = function (typeDef, Class) {
  var factory = new kevoree.factory.DefaultKevoreeFactory();

  // create a new dictionary
  var dictionary = factory.createDictionaryType().withGenerated_KMF_ID('0.0');

  function processParam(holder, prop) {
    if (prop.startsWith(KevoreeEntity.DIC)) {
      // retrieve object's attribute
      var objAttr = holder[prop] || {};

      // create a dictionary attribute
      var attr = factory.createDictionaryAttribute();
      attr.name = prop.replace(KevoreeEntity.DIC, '');

      attr.optional = (typeof objAttr.optional === 'undefined') ? true : objAttr.optional;
      attr.fragmentDependant = (typeof objAttr.fragmentDependant === 'undefined') ? false : objAttr.fragmentDependant;
      if (typeof (objAttr.defaultValue) !== 'undefined') {
        attr.defaultValue = objAttr.defaultValue;
      }

      if (typeof objAttr.datatype === 'undefined' || objAttr.datatype === null) {
        // no datatype given: let's try to find it
        attr.datatype = inferType(typeof objAttr.defaultValue);
      } else {
        // datatype given: use it properly
        if (typeof objAttr.datatype.metaClassName === 'function' && objAttr.datatype.metaClassName() === 'org.kevoree.DataType') {
          // datatype is from Kevoree lib DataType enum: all good
          attr.datatype = objAttr.datatype.name();

        } else if (typeof objAttr.datatype === 'string') {
          // datatype is a string primitive
          attr.datatype = inferType(objAttr.datatype);

        } else if (typeof objAttr.datatype === 'function') {
          // datatype is a function
          attr.datatype = inferType(typeof objAttr.datatype());

        } else {
          // default to "string"
          attr.datatype = inferType('string');
        }
      }

      // add attribute to dictionary
      dictionary.addAttributes(attr);
    }
  }

  // process non-static params
  Object.getOwnPropertyNames(Class.prototype).forEach(function (propName) {
    processParam(Class.prototype, propName);
  });
  // process static params
  Object.getOwnPropertyNames(Class).forEach(function (propName) {
    processParam(Class, propName);
  });

  // add dictionary to typeDef
  typeDef.dictionaryType = dictionary;

  return dictionary;
};
