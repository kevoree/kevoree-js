var AdaptationPrimitive = require('./AdaptationPrimitive'),
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
    execute: function (_super, callback) {
        _super.call(this, callback);

        if (this.modelElement) {
            if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
                // this element is a subNode to this.node
                this.log.debug(this.toString(), this.node.getName()+' has to remove '+this.modelElement.name);
                this.node.removeSubNode(this.modelElement);

            } else {
                var instance = this.mapper.getObject(this.modelElement.path());
                if (instance) {
                    this.mapper.removeEntry(this.modelElement.path());
                    this.doSpecificTypeProcess(this.modelElement);
                    this.log.debug(this.toString(), instance.getName()+' '+this.modelElement.typeDefinition.path());
                }
            }
        }

        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        var cmd = new AddInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    },

    doSpecificTypeProcess: function (kInstance) {
        if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ComponentTypeImpl)) {
            var provided = kInstance.provided;
            for (var i=0; i < provided.size(); i++) {
                this.mapper.removeEntry(provided.get(i).path());
            }

            var required = kInstance.required;
            for (var i=0; i < required.size(); i++) {
                this.mapper.removeEntry(required.get(i).path());
            }

        } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ChannelTypeImpl)) {

        } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.GroupTypeImpl)) {


        } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.NodeTypeImpl)) {

        }
    }
});