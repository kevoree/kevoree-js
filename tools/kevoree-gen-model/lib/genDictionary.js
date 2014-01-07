var KevoreeEntity = require('kevoree-entities').KevoreeEntity;
var kevoree = require('kevoree-library').org.kevoree;

/**
 * Generates dictionary and adds it to given typeDef
 * @param typeDef
 * @param obj
 * @returns {DictionaryType}
 */
module.exports = function (typeDef, obj) {
  var factory = new kevoree.impl.DefaultKevoreeFactory();

  // create a new dictionary
  var dictionary = factory.createDictionaryType();

  for (var prop in obj) {
    if (prop.startsWith(KevoreeEntity.DIC)) {
      // retrieve object's attribute
      var objAttr = obj[prop] || {};

      // create a dictionary attribute
      var attr = factory.createDictionaryAttribute();
      attr.name = prop.replace(KevoreeEntity.DIC, '');

      // do some checks
      var validDefaultValueTypes = ['string', 'boolean', 'number'];
      if (typeof(objAttr.defaultValue) != 'undefined' && validDefaultValueTypes.indexOf(typeof(objAttr.defaultValue)) == -1) {
        var error = new Error('Attribute "'+attr.name+'" defaultValue in "'+typeDef.name+'" must be a string or a boolean');
        error.code = 'PARSE_FAIL';
        throw error;
      } else if (typeof(objAttr.datatype) != 'undefined') {
        if (Object.prototype.toString.call(objAttr.datatype) !== '[object Array]') {
          var error = new Error('Attribute "'+attr.name+'" datatype in "'+typeDef.name+'" must be an array');
          error.code = 'PARSE_FAIL';
          throw error;
        } else {
          // datatype is defined and is an array, lets check if defaultValue is in it or not
          if (objAttr.datatype.indexOf(objAttr.defaultValue) == -1) {
            var error = new Error('Attribute "'+attr.name+'" defaultValue in "'+typeDef.name+'" must be part of your datatype array');
            error.code = 'PARSE_FAIL';
            throw error;
          }
        }
      }

      attr.optional           = (typeof(objAttr.optional) == 'undefined') ? true : objAttr.optional;
      attr.datatype           = (objAttr.datatype ? 'enum='+objAttr.datatype.join(','): undefined);
      attr.state              = objAttr.state;
      attr.fragmentDependant  = (typeof(objAttr.fragmentDependant) == 'undefined') ? false : objAttr.fragmentDependant;

      // add a defaultValue to attribute only if defined by user
      // 'null' is a defaultValue, but "undefined" is not a defaultValue =)
      if (typeof(objAttr.defaultValue) !== 'undefined') {
        attr.defaultValue = objAttr.defaultValue;
      }

      // add attribute to dictionary
      dictionary.addAttributes(attr);
    }
  }

  // add dictionary to typeDef
  typeDef.dictionaryType = dictionary;

  return dictionary;
}