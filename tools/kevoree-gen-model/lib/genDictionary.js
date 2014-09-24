var KevoreeEntity = require('kevoree-entities').KevoreeEntity;
var kevoree = require('kevoree-library').org.kevoree;
var Kotlin = require('kevoree-kotlin');

/**
 * Generates dictionary and adds it to given typeDef
 * @param typeDef
 * @param obj
 * @returns {DictionaryType}
 */
module.exports = function (typeDef, obj) {
    var factory = new kevoree.factory.DefaultKevoreeFactory();

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

            if (typeof (objAttr.datatype) === 'undefined') {
                // try to guess with given defaultValue
                if (typeof (attr.defaultValue) !== 'undefined') {
                    attr.datatype = typeof (attr.defaultValue);
                } else {
                    // if no datatype specified AND no given defaultValue => use string as datatype
                    attr.datatype = 'string';
                }
            } else {
                if (Kotlin.isType(objAttr.datatype, kevoree.DataType)) {
                    attr.datatype = objAttr.datatype.name();
                }
            }

            if (attr.datatype) {
                // datatype is defined
                switch (attr.datatype) {
                    case 'number':
                        attr.datatype = kevoree.DataType.object.INT.name();
                        break;

                    case 'boolean':
                        attr.datatype = kevoree.DataType.object.BOOLEAN.name();
                        break;

                    case 'string':
                        attr.datatype = kevoree.DataType.object.STRING.name();
                        break;
                }

            }

            // add attribute to dictionary
            dictionary.addAttributes(attr);
        }
    }

    // add dictionary to typeDef
    typeDef.dictionaryType = dictionary;

    return dictionary;
};