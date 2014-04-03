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

            attr.optional           = (typeof(objAttr.optional) == 'undefined') ? true : objAttr.optional;
            attr.fragmentDependant  = (typeof(objAttr.fragmentDependant) == 'undefined') ? false : objAttr.fragmentDependant;

            // add a defaultValue to attribute only if defined by user
            // 'null' is a defaultValue, but "undefined" is not a defaultValue =)
            if (typeof(objAttr.defaultValue) !== 'undefined') {
                attr.defaultValue = objAttr.defaultValue;
                attr.datatype     = typeof (objAttr.defaultValue);
            } else {
                attr.datatype = 'string';
            }

            // add attribute to dictionary
            dictionary.addAttributes(attr);
        }
    }

    // add dictionary to typeDef
    typeDef.dictionaryType = dictionary;

    return dictionary;
}