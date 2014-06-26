var AdaptationPrimitive = require('./AdaptationPrimitive'),
    StopInstance        = require('./StopInstance');

module.exports = AdaptationPrimitive.extend({
    toString: 'StartInstance',

    execute: function (_super, callback) {
        _super.call(this, callback);

        if (this.modelElement.name != this.node.getName()) {
            if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
                // this element is a subNode to this.node
                this.log.debug(this.toString(), this.node.getName()+' has to start '+this.modelElement.name);
                this.node.startSubNode(this.modelElement);
                callback();
                return;

            } else {
                var instance = this.mapper.getObject(this.modelElement.path());
                if (instance != undefined && instance != null) {
                    // check dictionary value and give default values if none set
                    var dicType = this.modelElement.typeDefinition.dictionaryType;
                    if (dicType) {
                        var attrs = dicType.attributes.iterator();
                        while (attrs.hasNext()) {
                            var attr = attrs.next();
                            var val = instance.dictionary.getValue(attr.name);
                            if (typeof(val) === 'undefined') {
                                // there is no value set for this attribute
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

                    // check if instance is already started
                    if (!instance.isStarted()) {
                        this.log.debug(this.toString(), instance.getPath());
                        instance.start();
                    }
                    callback();
                    return;

                } else {
                    callback(new Error(this.toString()+" error: unable to find instance "+this.modelElement.name));
                    return
                }
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