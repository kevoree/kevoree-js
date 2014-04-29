var AdaptationPrimitive = require('./AdaptationPrimitive'),
    StopInstance        = require('./StopInstance');

module.exports = AdaptationPrimitive.extend({
    toString: 'StartInstance',

    execute: function (_super, callback) {
        _super.call(this, callback);

        if (this.modelElement.name != this.node.getName() && this.isRelatedToPlatform(this.modelElement)) {
            var instance = this.mapper.getObject(this.modelElement.path());

            if (instance != undefined && instance != null) {
                // check dictionary value and give default values if none set
                var dicType = this.modelElement.typeDefinition.dictionaryType;
                if (dicType) {
                    var attrs = dicType.attributes.iterator();
                    while (attrs.hasNext()) {
                        var attr = attrs.next();
                        var val = instance.dictionary.getValue(attr.name);
                        if (!val) {
                            // there is no value set for this attribute
                            // first of all: check if there is a value for this attribute in the model instance
                            if (this.modelElement.dictionary && this.modelElement.dictionary.findValuesByID(attr.name)) {
                                var kVal = this.modelElement.dictionary.findValuesByID(attr.name);
                                instance.dictionary.setEntry(attr.name, kVal.value);

                            } else {
                                // there is no dictionary for this model instance
                                // lets inflate dictionary with default values if any
                                if (attr.optional) {
                                    // the attribute is optional, we will only add the value if defaultValue is set
                                    if (attr.defaultValue.length > 0) {
                                        instance.dictionary.setEntry(attr.name, attr.defaultValue);
                                    }
                                } else {
                                    // attribute is not optional, we have to have a value, then set defaultValue
                                    instance.dictionary.setEntry(attr.name, attr.defaultValue);
                                }
                            }
                        }
                    }
                }

                instance.start();
                this.log.debug(this.toString(), instance.getName());
                return callback();

            } else {
                return callback(new Error(this.toString()+" error: unable to start instance "+this.modelElement.name));
            }
        }

        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        var cmd = new StopInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    }
});