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
        // XXX do not use obj.hasOwnProperty(prop), otherwise NO attribute will be added
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

            if (typeof objAttr.datatype === 'undefined') {
                // no datatype given: let's try to find it
                attr.datatype = inferType(typeof objAttr.defaultValue);
            } else {
                // datatype given: use it properly
                if (Kotlin.isType(objAttr.datatype, kevoree.DataType)) {
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

    // add dictionary to typeDef
    typeDef.dictionaryType = dictionary;

    return dictionary;
};

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