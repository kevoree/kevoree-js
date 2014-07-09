var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive,
    AddInstance         = require('./AddInstance'),
    kevoree             = require('kevoree-library').org.kevoree,
    Kotlin              = require('kevoree-kotlin');

/**
 * RemoveInstance Adaptation command
 *
 * @type {RemoveInstance} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'RemoveInstance',

    /**
     *
     * @param _super AdaptationPrimitive parent
     * @param callback function: if this function first parameter != null it means that there is an error
     */
    execute: function (callback) {
        this._super(callback);

        if (this.modelElement) {
            if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
                // this element is a subNode to this.node
                this.log.debug(this.toString(), this.node.getName()+' has to remove '+this.modelElement.name);
                this.node.removeSubNode(this.modelElement);

            } else {
                var instance = this.mapper.getObject(this.modelElement.path());
                if (instance) {
                    this.mapper.removeEntry(this.modelElement.path());
                    this.log.debug(this.toString(), instance.getName()+' '+this.modelElement.typeDefinition.path());
                }
            }
        }

        return callback();
    },

    undo: function (callback) {
        this._super(callback);

        var cmd = new AddInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    }
});