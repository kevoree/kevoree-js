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
            if (typeof(objAttr.defaultValue) !== 'undefined') {
                attr.defaultValue = objAttr.defaultValue;
            }

            if (typeof(objAttr.datatype) !== 'undefined') {
                // datatype is defined
                if (attr.defaultValue) {
                    // double-check with type of given defaultValue
                    if (objAttr.datatype === typeof (attr.defaultValue)) {
                        attr.datatype = objAttr.datatype;
                    } else {
                        // and take defaultValue type if not equal
                        attr.datatype = typeof (attr.defaultValue);
                    }

                } else {
                    attr.datatype = objAttr.datatype;
                }

            } else {
                // datatype is not defined
                // try to guess with given defaultValue
                if (typeof (attr.defaultValue) !== 'undefined') {
                    attr.datatype = typeof (attr.defaultValue);
                } else {
                    // if no datatype specified AND no given defaultValue => use string as datatype
                    attr.datatype = 'string';
                }
            }

            // add attribute to dictionary
            dictionary.addAttributes(attr);
        }
    }

    // add dictionary to typeDef
    typeDef.dictionaryType = dictionary;

    return dictionary;
}