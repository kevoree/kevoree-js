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
     * @param {Function} done
     */
    start: function (done) {
        this.log.debug(this.toString(), 'START');
        done();
    },

    /**
     * this method will be called by the Kevoree platform when your group has to stop
     * @param {Function} done
     */
    stop: function (done) {
        this.log.debug(this.toString(), 'STOP');
        done();
    }
});

module.exports = <%= entityName %>;
