// this node extends JavascriptNode (from kevoree-node-javascript)
var JavascriptNode = require('kevoree-node-javascript');

/**
 * Kevoree group
 * @type {<%= entityName %>}
 */
var <%= entityName %> = JavascriptNode.extend({
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
