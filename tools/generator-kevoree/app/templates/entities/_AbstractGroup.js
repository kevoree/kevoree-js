// if you have already created your own Group extending AbstractGroup
// you can replace AbstractGroup here and use your own
// ex: var MyGroup = require('./path/to/MyGroup')
// the only thing needed is that the top level group extends AbstractGroup :)
var AbstractGroup = require('kevoree-entities').AbstractGroup;

/**
 * Kevoree group
 * @type {<%= entityName %>}
 */
var <%= entityName %> = <%= entityType %>.extend({
    toString: '<%= entityName %>',

    /* This is an example of dictionary attribute that you can set for your entity */
    //dic_yourAttrName: {
    //  optional: true,
    //  defaultValue: false
    //},

    /**
    * this method will be called by the Kevoree platform when your group has to start
    */
    start: function (_super) {
        _super.call(this);
        // TODO
        this.log.debug(this.toString(), 'START');
    },

    /**
    * this method will be called by the Kevoree platform when your group has to stop
    */
    stop: function () {
        // TODO
        this.log.debug(this.toString(), 'STOP');
    },

    /**
    * Should define a way to 'contact' targetNodeName and give the given model to it
    * @param model
    * @param targetNodeName
    */
    push: function (model, targetNodeName) {
        // TODO
        this.log.debug(this.toString(), 'TODO change current model with pushed one');
    },

    /**
    * Should define a way to 'contact' targetNodeName and retrieve its current model
    * @param targetNodeName
    * @param callback function(err, model)
    */
    pull: function (targetNodeName, callback) {
        // TODO
        this.log.debug(this.toString(), 'TODO send current model back to targetNodeName');
    }

});

module.exports = <%= entityName %>;
