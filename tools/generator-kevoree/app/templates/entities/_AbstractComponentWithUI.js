// if you have already created your own Component extending AbstractComponent
// you can replace AbstractComponent here and use your own
// ex: var MyComp = require('./path/to/MyComp')
// the only thing needed is that the top level component extends AbstractComponent :)
var AbstractComponent = require('kevoree-entities').AbstractComponent;
var view = require('../generated-ui/view');

/**
 * Kevoree component
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
     * this method will be called by the Kevoree platform when your component has to start
     * @param {Function} done
     */
    start: function (done) {
        this.setUIContent(view({date: new Date()}), function (err, root) {
            if (err) {
                // if there is an error, it probably means that you are not running in the browser
                // but probably in the NodeJS runtime. So you don't have an UI. You can only "log" :)
                this.log.debug(this.toString(), '<%= entityName %> started');

            } else {
                var myBtn = root.querySelector('#myBtn');
                myBtn.onclick = function () {
                    console.log('Button clicked!');
                };
            }

            done();
        });
    },

    /**
     * this method will be called by the Kevoree platform when your component has to stop
     * @param {Function} done
     */
    stop: function (done) {
        this.log.debug(this.toString(), 'STOP');
        done();
    }
});

module.exports = <%= entityName %>;
