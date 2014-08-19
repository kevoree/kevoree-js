var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;
var timeout             = require('../timeout-handler');

var StartInstance = AdaptationPrimitive.extend({
    toString: 'StartInstance',

    execute: function (callback) {
        this._super(callback);

        if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
            // this element is a subNode to this.node
            this.node.startSubNode(this.modelElement, timeout(this.node.getName() + '.startSubNode(...)', function (err) {
                if (!err) {
                    this.log.debug(this.toString(), this.node.getName()+' has to start '+this.modelElement.name);
                }
                callback(err);
            }.bind(this)));

        } else {
            var instance;
            if (this.modelElement.name === this.node.getName()) {
                instance = this.node;
            } else {
                instance = this.mapper.getObject(this.modelElement.path());
            }
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
                    instance.start(timeout(instance.getPath() + ' start(...)', function (err) {
                        if (!err) {
                            this.log.debug(this.toString(), instance.getPath());
                        }
                        callback(err);
                    }.bind(this)));
                } else {
                    callback();
                }

            } else {
                callback(new Error(this.toString()+" error: unable to find instance "+this.modelElement.name));
            }
        }
    },

    undo: function (callback) {
        this._super(callback);

        var StopInstance = require('./StopInstance');
        var cmd = new StopInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    }
});

module.exports = StartInstance;